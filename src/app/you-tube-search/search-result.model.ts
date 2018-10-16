/**
 * SearchResult is a data-structure that holds an individual
 * record from a youtube video search
 */

 export class SearchResult {
     id: string;
     title: string;
     description: string;
     thumbnailUrl: string;
     videoURL: string;

     constructor(obj?: any){
         this.id = obj && obj.id  || null;
         this.title = obj && obj.title  || null;
         this.description = obj && obj.description  || null;
         this.thumbnailUrl = obj && obj.thumbnailURL  || null;
         this.videoURL = obj && obj.videoURL  || 
                            `https://www.youtube.com/watch?v=${this.id}`;
     }
 }