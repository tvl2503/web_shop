import agent from "../../service/agent";

let category = {}
const cate = async () => {
    category = await agent.Category.getAllCategory();
}
cate()

export default category
