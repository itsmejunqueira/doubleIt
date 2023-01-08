import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
import { NgxSpinnerModule } from 'ngx-spinner'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProductsService } from './services/products.service'
import { AttachimentsService } from './services/attachments.service'
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [ProductsService,AttachimentsService],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [        ],
    }
  }
}
