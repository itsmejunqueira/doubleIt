import { Injectable } from '@angular/core'
import { finalize } from 'rxjs'
import { lastValueFrom } from 'rxjs'
import { NgxSpinnerService } from 'ngx-spinner'
import { TrequestParams } from '../models/request.model'

@Injectable()
export class AttachimentsService {
  constructor(
    private _spinnerService: NgxSpinnerService
  ) {}

  public async getAttachmentsStageEnd(jobId: number) {
   // const objectToSend: TrequestParams[] = [{ key: 'jobId', value: jobId }]
   // const result$ = await this._requestService
      // .get(
      //   environment.api.endpoints.projectStage.editPosition
      //     .getAttachmentsStageEnd.endpoint,
      //   objectToSend
      // )
      //.pipe(
     //   finalize(() => {
    //      this._spinnerService.hide()
    //    })
    //  )
    //return await lastValueFrom(result$)
  }

  public async saveAttachmentsStageEnd(sendObject: any) {
   // const result$ = this._requestService
      // .uploadFiles(
      //   environment.api.endpoints.projectStage.editPosition
      //     .saveAttachmentsStageEnd.endpoint,
      //   sendObject
      // )
      // .pipe(
      //   finalize(() => {
      //     this._spinnerService.hide()
      //   })
      // )
    //return await lastValueFrom(result$)
  }
}
