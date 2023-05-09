import { Component, Input, OnInit } from '@angular/core';
import { GiphyService } from 'src/app/service/giphy-search.service';

@Component({
  selector: 'app-user-images',
  templateUrl: './user-images.component.html',
  styleUrls: ['./user-images.component.scss']
})
export class UserImagesComponent implements OnInit {

  @Input()
  storedImages: any
 
  constructor(private readonly giphyService: GiphyService) { 
   
  }

  ngOnInit(): void {
  }
 

 saveImage(url: string,filename: string)
{
  this.giphyService.downloadFile(url,filename)
}

}
