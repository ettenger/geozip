import { zipCodes } from '../data/zip_codes';

export const ZipCodeController = {
  show
};

// GET /v1/zip/:country/:zipCode
function show(req, res, params): Promise<any> {
  return new Promise((resolve) => {
    resolve(zipCodes[params.zipCode]);
  });
}
