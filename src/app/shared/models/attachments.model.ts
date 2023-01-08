export type TattachimentsRequest = {
  attachments: Tattachments[]
  comment: string | null
}

export type Tattachments = {
  attachmentsName: string
  uploadDate: string
}
