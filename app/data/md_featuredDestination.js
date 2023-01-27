import { Images } from "@config";
import { UserData } from "./user";
import {PostData} from './services/PostData';

export function md_featuredDestination() {
PostData('get_featured_destination')
    .then((result) => {
       return result;
    }
);
}

