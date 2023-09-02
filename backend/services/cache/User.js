import { EntityId } from "redis-om";
import { userRepository } from "../../model/cache/User.js";


class UserRedisService {
    async redisRedister(id,data){
        await userRepository.save(`${id}`, data)
    }
    async chackFildWithValue(filed,value){
       const data = await userRepository.search().where(filed).equals(value).return.first();
       return {
        id: data[EntityId],
        ...data
       }
    }
}


export const userRedisService = new UserRedisService()