const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const sendMail = require("../../utils/sendMail");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports.createCheckout = async (req, res) => {
    try{
        const userId = req.user._id;
        const cart = await Cart.findOne({userId});
        if(!cart) {
            return res.status(400).json({code : 400, message : "Người dùng không có sản phẩm trong giỏ hàng"})
        }
        const products = cart.products.map((item) => {
            return {product : item.productId, quantity : item.quantity}
        })
        const order = await Order.create({...req.body, userId, products, amount : cart.total, payment_method : req.body.type});
        const text = `
        <!DOCTYPE html>
        <html>

        <head>
            <title>Đặt hàng thành công</title>
        </head>

        <body>
            <div>
                <h3>Xin chào ${req.user.fullname},</h3>
                <p>Bạn đã đặt hàng thành công, với tổng số tiền là ${cart.total} vnd</p>
                <p>Xin cảm ơn, Chúng tôi sẽ gửi hàng sớm nhất cho bạn</p>
                <br>
                <p>Cảm ơn.</p>
            </div>
        
        </body>

        </html>
        `

        await Cart.findByIdAndDelete(cart._id)
        await sendMail(req.user.email, "Đặt hàng thành công", text);
        if(req.body.type === 'card'){
            const customer = await stripe.customers.create({
                metadata : {
                    userId: userId.toString(),
                    order : order._id.toString()
                }
            })
            
            const line_items = cart.products.map((item) => {
                return {
                    price_data : {
                        currency: "vnd",
                        product_data: {
                        name: item.name,
                        images: [item.img],
                        description: item.name,
                        metadata: {
                            id: item.productId,
                        },
                        },
                        unit_amount: parseInt(item.price * item.quantity*(1-item.percentReduce/100)),
                    },
                    quantity: item.quantity,
                }
            })
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                line_items,
                customer: customer.id,
                success_url: `${process.env.CLIENT_URL}/checkout-success/${order._id.toString()}`,
                cancel_url: `${process.env.CLIENT_URL}/cart`,
            })
    
           return  res.status(200).json({code : 200, message: "Thành công", result : session.url})
        }
        return  res.status(200).json({code : 200, message: "Thành công", result : order})

    }catch(err){
        console.log(err);
    }
}

module.exports.webhook = async (req,res) =>{
    let data;
    let endpointSecret = "whsec_d2ce14543862599564374ce67a9251193e23662d2766bb78d60f38cc4405db87";
    const sig = req.headers['stripe-signature'];
    let event;
    const payload = req.body
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
        console.log(err);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    data = event.data.object
    if (event.type === "payment_intent.succeeded") {
        stripe.customers
            .retrieve(data.customer)
            .then(async (customer) => {
            try {
                // createOrder(customer, data);
                await Order.findByIdAndUpdate(customer.metadata.order, {
                    $set : {
                        status_payment : 1
                    }
                })
            } catch (err) {
                console.log(typeof createOrder);
                console.log(err);
            }
            })
            .catch((err) => console.log(err.message));
    }
    res.status(200).end();
}