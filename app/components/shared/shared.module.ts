import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
@NgModule({
  imports: [
    TabMenuModule,
    ButtonModule,
    InputTextModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    ImageModule,
    CardModule,
  ],
  exports: [
    TabMenuModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    ImageModule,
    CardModule,
  ],
})
export class SharedModule {}
