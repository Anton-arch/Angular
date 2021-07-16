import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InputMaskModule } from 'primeng/inputmask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAppealComponent } from './create-appeal/create-appeal.component';
import { InputFocusedDirective } from './input-focused.directive';
import { AppealPageComponent } from './appeal-page/appeal-page.component';
import { AppealItemComponent } from './appeal-item/appeal-item.component';
import { AppealComponent } from './appeal/appeal.component';
import { FiterPipePipe } from './fiter-pipe.pipe';
import { ModalQuestionComponent } from './modal-question/modal-question.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAppealComponent,
    InputFocusedDirective,
    AppealPageComponent,
    AppealItemComponent,
    AppealComponent,
    FiterPipePipe,
    ModalQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputMaskModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
