import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { SearchResult } from './search-result.model';
/**
 * youtubeservice connects to the youtube api
 */

 /*
 * option1: This API key only works for localhost
 * option2: Request an own one by following these instructions:
 * https://developers.google.com/youtube/registering_an_application#Create_API_Keys
 */
export const YOUTUBE_API_KEY =
'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export const YOUTUBE_API_URL =
'https://www.googleapis.com/youtube/v3/search';

 @Injectable()
 export class YouTubeSearchService{
     
     constructor(
         private http: HttpClient,
         @Inject(YOUTUBE_API_KEY) private apiKey: string,
         @Inject(YOUTUBE_API_URL) private apiUrl: string
     ) {}

     search(query: string): Observable<SearchResult[]> {
         const params: string = [
             `q=${query}`,
             `key=${this.apiKey}`,
             `part=snippet`,
             `type=video`,
             `maxResults=10`
         ].join('&');
         
         const queryUrl = `${this.apiUrl}?${params}`;  // concatenating apiurl and params
         
         return this.http.get(queryUrl).pipe(map(response => {
             return <any>response['items'].map(item => {
                 //console.log("raw item", item);
                 return new SearchResult({
                     id: item.id.videoId,
                     title: item.snippet.title,
                     description: item.snippet.description,
                     thumbnailUrl: item.snippet.thumbnail.high.url
                 });
             });
         }));
     }

 }