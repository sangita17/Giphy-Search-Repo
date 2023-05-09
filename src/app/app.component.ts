import { Component } from '@angular/core';
import { GiphyService } from './service/giphy-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'giphy-image-project';
  localStoreMode = true
  imageCount = 0
  storedImages:{id:string,url:string,dateAdded:number}[] = []
  constructor(public giphyService: GiphyService) {
    this.giphyService.refreshStoreImage.subscribe(value => {
      if(value){
        this.imageCount += 1
        this.loadData()
      }
     
    }
      )
   }
  
  ngOnInit(): void {
    this.loadData()
  }
  search(searchText: string) {
    if(this.localStoreMode)
    this.searchLocal(searchText)
    else
    this.giphyService.search(searchText);
  }
  onLoadMore() {
      this.giphyService.next();
  }

  loadData(searchText=''){
    let value:any
    let url =''
    let title = ''
    let dateAdded = 0
    this.storedImages = []
    for(var key in localStorage){
      if(localStorage.hasOwnProperty(key)) {
         console.log(key + ' : ' + localStorage.getItem(key));
         if(key.split('*')[0]=== 'giphy' && localStorage.getItem(key)){
          value = JSON.parse(localStorage.getItem(key)!)
          url=value[0]
          title = value[1]
          dateAdded = value[2]
          if(searchText){
            if(title.toLowerCase().indexOf(searchText.toLowerCase())>-1)
            this.storedImages.push({id:title,url,dateAdded})
          }
          else
          this.storedImages.push({id:title,url,dateAdded})
         console.log(this.storedImages);
         }
      }
   }
  }

searchLocal(searchText: string)
{
  this.loadData(searchText)
}
 reset()
 {
  this.loadData()
 } 

 sort(value:string): void {

  value==='Oldest' ? this.storedImages.sort((a, b) => a.dateAdded < b.dateAdded ? -1 : 1) : this.storedImages.sort((a, b) => a.dateAdded > b.dateAdded ? -1 : 1)
}
  
}
