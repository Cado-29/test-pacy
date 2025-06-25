"use strict";
exports.__esModule = true;
exports.buildCertificateMetadata = void 0;
function buildCertificateMetadata(studentName, course, date, imageUri // data URI or ipfs://CID
) {
    return {
        name: "Certificate - " + studentName,
        image: imageUri,
        mediaType: 'image/png',
        description: "Certificate for " + studentName + " in " + course,
        files: [
            {
                mediaType: 'image/png',
                name: 'Certificate',
                src: imageUri
            },
        ],
        extra: {
            course: course,
            issued: date
        }
    };
}
exports.buildCertificateMetadata = buildCertificateMetadata;
