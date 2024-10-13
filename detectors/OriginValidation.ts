import {SourceFile, SyntaxKind} from "ts-morph";
import {Finding} from "../types";
import {RiskRating} from "../structures";
import {DetectorBase} from "./DetectorBase";
import {installSnap} from '@metamask/snaps-simulation';

class OriginValidation extends DetectorBase {
  private counter: number;

  constructor() {
    super("originValidation", RiskRating.High);
    this.counter = 0
  }

  private async hasDomainAllowList() {
    const snapId: any = 'local:http://localhost:3333';
    const {request} = await installSnap(snapId)
    let hasErrored = false;

    const {response}: any = await request({
      origin: "https://theansweris42.com:4242",
      method: "hello",
      params: [],
    })
    if (response.error) {
      hasErrored = true;
    }
    return hasErrored
  }

  public async run(sourceFile: SourceFile): Promise<Finding[]> {
    this.counter += 1
    if (this.counter > 1) {
      return this.getFindings();
    }

    let hasAllowList = await this.hasDomainAllowList();
    if (!hasAllowList) {
      this.addFinding(`Insufficient origin validation`, sourceFile.getFilePath(), 0)
    }

    return this.getFindings();
  }
}

export {OriginValidation};

// (async function test() {
//   const snapId: any = 'local:http://localhost:3333';
//   const {request, onHomePage, onTransaction} = await installSnap(snapId)
//   const response = await request({
//     origin: "http://localhost:8080",
//     method: "hello",
//     params: [],
//   })
//   console.log(response)
//   const ui = await onHomePage()
//   let interface_ =  ui.getInterface()
//   console.log(interface_)
// })()
