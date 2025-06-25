"use strict";
exports.__esModule = true;
exports.buildCertificateMetadata = void 0;
function buildCertificateMetadata(studentName, course, date, imageCid // new parameter for IPFS CID (without ipfs:// prefix)
) {
    var ipfsUri = "ipfs://" + imageCid;
    return {
        name: "Certificate - " + studentName,
        image: ipfsUri,
        mediaType: 'image/png',
        description: "Certificate for " + studentName + " in " + course,
        files: [
            {
                mediaType: 'image/png',
                name: 'Certificate',
                src: ipfsUri
            },
        ],
        extra: {
            course: course,
            issued: date
        }
    };
}
exports.buildCertificateMetadata = buildCertificateMetadata;
