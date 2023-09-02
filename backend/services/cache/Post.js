import { postRepository } from "../../model/cache/Post.js";
import { EntityId } from 'redis-om';


class PostWithCahce{
    async create(id,data){
        await postRepository.save(`${id}`,data);
    }

    async getPostById(id){
       const data = await postRepository.fetch(id);
       return {
        id: data[EntityId],
        ...data
       }
    }
    
    async getPostByPagination(skip,limit){
       const data = await postRepository.search().sortDescending('createdAt').return.page(skip,limit);
       const newData = data.map(item=>{
        return {
            id: item[EntityId],
            ...item
        }
      })
      return newData;
    }
    
    async countOfPost(){
      return await postRepository.search().return.count();
    }
}


export const postWithCache = new PostWithCahce();