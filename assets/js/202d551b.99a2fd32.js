"use strict";(self.webpackChunksnapper_docs=self.webpackChunksnapper_docs||[]).push([[7908],{8939:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>a,frontMatter:()=>t,metadata:()=>r,toc:()=>o});const r=JSON.parse('{"id":"API/src/detectors/UnusedFunctions/classes/UnusedFunctionsDetector","title":"UnusedFunctionsDetector","description":"Snapper Project","source":"@site/docs/API/src/detectors/UnusedFunctions/classes/UnusedFunctionsDetector.md","sourceDirName":"API/src/detectors/UnusedFunctions/classes","slug":"/API/src/detectors/UnusedFunctions/classes/UnusedFunctionsDetector","permalink":"/Snapper/API/src/detectors/UnusedFunctions/classes/UnusedFunctionsDetector","draft":false,"unlisted":false,"editUrl":"https://github.com/sayfer-io/Snapper/blob/main/docs/API/src/detectors/UnusedFunctions/classes/UnusedFunctionsDetector.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"UnhandledPromiseRejectionDetector","permalink":"/Snapper/API/src/detectors/UnhandledPromiseRejection/classes/UnhandledPromiseRejectionDetector"},"next":{"title":"UnusedImportsDetector","permalink":"/Snapper/API/src/detectors/UnusedImports/classes/UnusedImportsDetector"}}');var d=n(4848),i=n(8453);const t={},c=void 0,l={},o=[{value:"Extends",id:"extends",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new UnusedFunctionsDetector()",id:"new-unusedfunctionsdetector",level:3},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"allowedFileRegexes",id:"allowedfileregexes",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"findings",id:"findings",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"riskRating",id:"riskrating",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"Methods",id:"methods",level:2},{value:"addFinding()",id:"addfinding",level:3},{value:"Parameters",id:"parameters",level:4},{value:"description",id:"description",level:5},{value:"filePath",id:"filepath",level:5},{value:"lineNum",id:"linenum",level:5},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"clearFindings()",id:"clearfindings",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"getFindings()",id:"getfindings",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"getName()",id:"getname",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"logDebug()",id:"logdebug",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"message",id:"message",level:5},{value:"Returns",id:"returns-5",level:4},{value:"Inherited from",id:"inherited-from-8",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"logError()",id:"logerror",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"message",id:"message-1",level:5},{value:"error?",id:"error",level:5},{value:"Returns",id:"returns-6",level:4},{value:"Inherited from",id:"inherited-from-9",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"logInfo()",id:"loginfo",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"message",id:"message-2",level:5},{value:"Returns",id:"returns-7",level:4},{value:"Inherited from",id:"inherited-from-10",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"logWarning()",id:"logwarning",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"message",id:"message-3",level:5},{value:"error?",id:"error-1",level:5},{value:"Returns",id:"returns-8",level:4},{value:"Inherited from",id:"inherited-from-11",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"run()",id:"run",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"sourceFile",id:"sourcefile",level:5},{value:"Returns",id:"returns-9",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-13",level:4}];function h(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"../../../../README.md",children:(0,d.jsx)(s.strong,{children:"Snapper Project"})})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h1,{id:"class-unusedfunctionsdetector",children:"Class: UnusedFunctionsDetector"}),"\n",(0,d.jsx)(s.p,{children:"Class to detect unused functions in the source code.\nThis detector identifies function declarations that are not used or exported,\nhelping to maintain clean and efficient code by eliminating dead code."}),"\n",(0,d.jsx)(s.h2,{id:"extends",children:"Extends"}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsx)(s.li,{children:(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})})}),"\n"]}),"\n",(0,d.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,d.jsx)(s.h3,{id:"new-unusedfunctionsdetector",children:"new UnusedFunctionsDetector()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"new UnusedFunctionsDetector"}),"(): ",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/UnusedFunctions/classes/UnusedFunctionsDetector",children:(0,d.jsx)(s.code,{children:"UnusedFunctionsDetector"})})]}),"\n"]}),"\n",(0,d.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/UnusedFunctions/classes/UnusedFunctionsDetector",children:(0,d.jsx)(s.code,{children:"UnusedFunctionsDetector"})})}),"\n",(0,d.jsx)(s.h4,{id:"overrides",children:"Overrides"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#constructors",children:(0,d.jsx)(s.code,{children:"constructor"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/UnusedFunctions.ts#L13",children:"src/detectors/UnusedFunctions.ts:13"})}),"\n",(0,d.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,d.jsx)(s.h3,{id:"allowedfileregexes",children:"allowedFileRegexes"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"allowedFileRegexes"}),": ",(0,d.jsx)(s.code,{children:"RegExp"}),"[]"]}),"\n"]}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#allowedfileregexes",children:(0,d.jsx)(s.code,{children:"allowedFileRegexes"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L19",children:"src/detectors/DetectorBase.ts:19"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"findings",children:"findings"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.code,{children:"protected"})," ",(0,d.jsx)(s.strong,{children:"findings"}),": ",(0,d.jsx)(s.a,{href:"/Snapper/API/src/types/type-aliases/Finding",children:(0,d.jsx)(s.code,{children:"Finding"})}),"[] = ",(0,d.jsx)(s.code,{children:"[]"})]}),"\n"]}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#findings",children:(0,d.jsx)(s.code,{children:"findings"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L16",children:"src/detectors/DetectorBase.ts:16"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"name",children:"name"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.code,{children:"protected"})," ",(0,d.jsx)(s.strong,{children:"name"}),": ",(0,d.jsx)(s.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#name-1",children:(0,d.jsx)(s.code,{children:"name"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L14",children:"src/detectors/DetectorBase.ts:14"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"riskrating",children:"riskRating"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.code,{children:"protected"})," ",(0,d.jsx)(s.strong,{children:"riskRating"}),": ",(0,d.jsx)(s.a,{href:"/Snapper/API/src/structures/enumerations/RiskRating",children:(0,d.jsx)(s.code,{children:"RiskRating"})})]}),"\n"]}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-3",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#riskrating-1",children:(0,d.jsx)(s.code,{children:"riskRating"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L15",children:"src/detectors/DetectorBase.ts:15"})}),"\n",(0,d.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,d.jsx)(s.h3,{id:"addfinding",children:"addFinding()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"addFinding"}),"(",(0,d.jsx)(s.code,{children:"description"}),", ",(0,d.jsx)(s.code,{children:"filePath"}),", ",(0,d.jsx)(s.code,{children:"lineNum"}),"): ",(0,d.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,d.jsx)(s.p,{children:"Adds a finding to the findings array.\nThis method creates a Finding object and logs a debug message before adding it to the findings list."}),"\n",(0,d.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,d.jsx)(s.h5,{id:"description",children:"description"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"string"})}),"\n",(0,d.jsx)(s.p,{children:"Description of the finding."}),"\n",(0,d.jsx)(s.h5,{id:"filepath",children:"filePath"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"string"})}),"\n",(0,d.jsx)(s.p,{children:"Path of the file where the finding was detected."}),"\n",(0,d.jsx)(s.h5,{id:"linenum",children:"lineNum"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.code,{children:"number"})," = ",(0,d.jsx)(s.code,{children:"1"})]}),"\n",(0,d.jsx)(s.p,{children:"Line number where the finding was detected (default is 1)."}),"\n",(0,d.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"void"})}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-4",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#addfinding",children:(0,d.jsx)(s.code,{children:"addFinding"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L41",children:"src/detectors/DetectorBase.ts:41"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"clearfindings",children:"clearFindings()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"clearFindings"}),"(): ",(0,d.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,d.jsx)(s.p,{children:"Clears all findings from the detector.\nThis method resets the findings array to an empty state."}),"\n",(0,d.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"void"})}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-5",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#clearfindings",children:(0,d.jsx)(s.code,{children:"clearFindings"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L59",children:"src/detectors/DetectorBase.ts:59"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"getfindings",children:"getFindings()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"getFindings"}),"(): ",(0,d.jsx)(s.a,{href:"/Snapper/API/src/types/type-aliases/Finding",children:(0,d.jsx)(s.code,{children:"Finding"})}),"[]"]}),"\n"]}),"\n",(0,d.jsx)(s.p,{children:"Retrieves all findings collected by the detector."}),"\n",(0,d.jsx)(s.h4,{id:"returns-3",children:"Returns"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/types/type-aliases/Finding",children:(0,d.jsx)(s.code,{children:"Finding"})}),"[]"]}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsx)(s.li,{children:"Array of findings."}),"\n"]}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-6",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#getfindings",children:(0,d.jsx)(s.code,{children:"getFindings"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L75",children:"src/detectors/DetectorBase.ts:75"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"getname",children:"getName()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"getName"}),"(): ",(0,d.jsx)(s.code,{children:"string"})]}),"\n"]}),"\n",(0,d.jsx)(s.p,{children:"Gets the name of the detector."}),"\n",(0,d.jsx)(s.h4,{id:"returns-4",children:"Returns"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"string"})}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsx)(s.li,{children:"The name of the detector."}),"\n"]}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-7",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#getname",children:(0,d.jsx)(s.code,{children:"getName"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-8",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L67",children:"src/detectors/DetectorBase.ts:67"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"logdebug",children:"logDebug()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"logDebug"}),"(",(0,d.jsx)(s.code,{children:"message"}),"): ",(0,d.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,d.jsx)(s.p,{children:"Logs a debug message.\nThis method formats the message with the detector's name and logs it at the debug level."}),"\n",(0,d.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,d.jsx)(s.h5,{id:"message",children:"message"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"string"})}),"\n",(0,d.jsx)(s.p,{children:"The message to log."}),"\n",(0,d.jsx)(s.h4,{id:"returns-5",children:"Returns"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"void"})}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-8",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#logdebug",children:(0,d.jsx)(s.code,{children:"logDebug"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-9",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L93",children:"src/detectors/DetectorBase.ts:93"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"logerror",children:"logError()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"logError"}),"(",(0,d.jsx)(s.code,{children:"message"}),", ",(0,d.jsx)(s.code,{children:"error"}),"?): ",(0,d.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,d.jsx)(s.p,{children:"Logs an error message.\nThis method formats the message with the detector's name and logs it at the error level."}),"\n",(0,d.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,d.jsx)(s.h5,{id:"message-1",children:"message"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"string"})}),"\n",(0,d.jsx)(s.p,{children:"The message to log."}),"\n",(0,d.jsx)(s.h5,{id:"error",children:"error?"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"Error"})}),"\n",(0,d.jsx)(s.p,{children:"Optional error object to log alongside the message."}),"\n",(0,d.jsx)(s.h4,{id:"returns-6",children:"Returns"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"void"})}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-9",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#logerror",children:(0,d.jsx)(s.code,{children:"logError"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-10",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L103",children:"src/detectors/DetectorBase.ts:103"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"loginfo",children:"logInfo()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"logInfo"}),"(",(0,d.jsx)(s.code,{children:"message"}),"): ",(0,d.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,d.jsx)(s.p,{children:"Logs an informational message.\nThis method formats the message with the detector's name and logs it at the info level."}),"\n",(0,d.jsx)(s.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,d.jsx)(s.h5,{id:"message-2",children:"message"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"string"})}),"\n",(0,d.jsx)(s.p,{children:"The message to log."}),"\n",(0,d.jsx)(s.h4,{id:"returns-7",children:"Returns"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"void"})}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-10",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#loginfo",children:(0,d.jsx)(s.code,{children:"logInfo"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-11",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L84",children:"src/detectors/DetectorBase.ts:84"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"logwarning",children:"logWarning()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"logWarning"}),"(",(0,d.jsx)(s.code,{children:"message"}),", ",(0,d.jsx)(s.code,{children:"error"}),"?): ",(0,d.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,d.jsx)(s.p,{children:"Logs a warning message.\nThis method formats the message with the detector's name and logs it at the warning level."}),"\n",(0,d.jsx)(s.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,d.jsx)(s.h5,{id:"message-3",children:"message"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"string"})}),"\n",(0,d.jsx)(s.p,{children:"The message to log."}),"\n",(0,d.jsx)(s.h5,{id:"error-1",children:"error?"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"Error"})}),"\n",(0,d.jsx)(s.p,{children:"Optional error object to log alongside the message."}),"\n",(0,d.jsx)(s.h4,{id:"returns-8",children:"Returns"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"void"})}),"\n",(0,d.jsx)(s.h4,{id:"inherited-from-11",children:"Inherited from"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#logwarning",children:(0,d.jsx)(s.code,{children:"logWarning"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-12",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/DetectorBase.ts#L113",children:"src/detectors/DetectorBase.ts:113"})}),"\n",(0,d.jsx)(s.hr,{}),"\n",(0,d.jsx)(s.h3,{id:"run",children:"run()"}),"\n",(0,d.jsxs)(s.blockquote,{children:["\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.strong,{children:"run"}),"(",(0,d.jsx)(s.code,{children:"sourceFile"}),"): ",(0,d.jsx)(s.a,{href:"/Snapper/API/src/types/type-aliases/Finding",children:(0,d.jsx)(s.code,{children:"Finding"})}),"[]"]}),"\n"]}),"\n",(0,d.jsx)(s.p,{children:"Runs the detector on the specified source file to identify unused functions."}),"\n",(0,d.jsx)(s.p,{children:"This method orchestrates the detection process by collecting used identifiers,\nfetching all function declarations, and then checking each function to see if it\nis used or exported. It reports findings for any unused functions detected."}),"\n",(0,d.jsx)(s.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,d.jsx)(s.h5,{id:"sourcefile",children:"sourceFile"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"SourceFile"})}),"\n",(0,d.jsx)(s.p,{children:"The source file to analyze for unused functions."}),"\n",(0,d.jsx)(s.h4,{id:"returns-9",children:"Returns"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/types/type-aliases/Finding",children:(0,d.jsx)(s.code,{children:"Finding"})}),"[]"]}),"\n",(0,d.jsxs)(s.ul,{children:["\n",(0,d.jsx)(s.li,{children:"An array of findings with details about unused functions."}),"\n"]}),"\n",(0,d.jsx)(s.h4,{id:"overrides-1",children:"Overrides"}),"\n",(0,d.jsxs)(s.p,{children:[(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase",children:(0,d.jsx)(s.code,{children:"DetectorBase"})}),".",(0,d.jsx)(s.a,{href:"/Snapper/API/src/detectors/DetectorBase/classes/DetectorBase#run",children:(0,d.jsx)(s.code,{children:"run"})})]}),"\n",(0,d.jsx)(s.h4,{id:"defined-in-13",children:"Defined in"}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/f47abc125b4408d60ef312c339db8733d57812d5/src/detectors/UnusedFunctions.ts#L110",children:"src/detectors/UnusedFunctions.ts:110"})})]})}function a(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,d.jsx)(s,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>t,x:()=>c});var r=n(6540);const d={},i=r.createContext(d);function t(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:t(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);