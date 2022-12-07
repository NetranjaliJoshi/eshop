import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { GallaryComponent } from './components/gallary/gallary.component';

@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [BannerComponent, GallaryComponent],
    exports: [BannerComponent, GallaryComponent]
})
export class UiModule {}
