import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const tradeReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: ['Hello world'],
  };

  return docDefinition;
};
