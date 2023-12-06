import useAPI from "src/composable/UserAPI";

export default function postsService(){
  const {list, post, update, remove} = useAPI('posts')
  return{
    list,
    post,
    update,
    remove
  }
}
