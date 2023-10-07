const fs = require('fs')
export class FileWriter {
  static setFile(url: string, cnt: string) {
    return new Promise((rsv, rej) => {
      // rsv(null)
      // return;


      let lastGIdx = url.lastIndexOf('/');
      let dir = url.slice(0, lastGIdx);
      fs.mkdir(dir, (err: any) => {
        fs.writeFile(url, cnt, 'utf-8', (err: string, data: any) => {
          if (!err) {
            rsv(null)
          } else {
            rej(null)
          }
        })
      })

      

    })
  }
}