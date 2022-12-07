import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ui-gallary',
    templateUrl: './gallary.component.html',
    styles: []
})
export class GallaryComponent implements OnInit {
    selectedImage :string;
    @Input() images : string[];
    
    constructor() {console.log()}

    ngOnInit(): void {
        if(this.images.length){
            this.selectedImage = this.images[0]
        }
        
    }
    changeSelectedImage(imageUrl : string)
    {
        this.selectedImage = imageUrl
    }

    get hasImages() {
        return this.images?.length > 0;
    }
}
