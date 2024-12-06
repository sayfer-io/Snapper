"use strict";(self.webpackChunksnapper_docs=self.webpackChunksnapper_docs||[]).push([[5585],{8110:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>t,metadata:()=>s,toc:()=>a});const s=JSON.parse('{"id":"API/detectors/LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector","title":"LackOfExceptionHandlingDetector","description":"Snapper Project","source":"@site/docs/API/detectors/LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector.md","sourceDirName":"API/detectors/LackOfExceptionHandling/classes","slug":"/API/detectors/LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector","permalink":"/Snapper/API/detectors/LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector","draft":false,"unlisted":false,"editUrl":"https://github.com/sayfer-io/Snapper/blob/main/docs/API/detectors/LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"InsecureRandomnessDetector","permalink":"/Snapper/API/detectors/InsecureRandomness/classes/InsecureRandomnessDetector"},"next":{"title":"LeftoverTODOsDetector","permalink":"/Snapper/API/detectors/LeftoverTODOs/classes/LeftoverTODOsDetector"}}');var i=r(4848),d=r(8453);const t={},c=void 0,l={},a=[{value:"Extends",id:"extends",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new LackOfExceptionHandlingDetector()",id:"new-lackofexceptionhandlingdetector",level:3},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"allowedFileRegexes",id:"allowedfileregexes",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"findings",id:"findings",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"riskRating",id:"riskrating",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"Methods",id:"methods",level:2},{value:"addFinding()",id:"addfinding",level:3},{value:"Parameters",id:"parameters",level:4},{value:"description",id:"description",level:5},{value:"filePath",id:"filepath",level:5},{value:"lineNum",id:"linenum",level:5},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"clearFindings()",id:"clearfindings",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"getFindings()",id:"getfindings",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"getName()",id:"getname",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"logDebug()",id:"logdebug",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"message",id:"message",level:5},{value:"Returns",id:"returns-5",level:4},{value:"Inherited from",id:"inherited-from-8",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"logError()",id:"logerror",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"message",id:"message-1",level:5},{value:"error?",id:"error",level:5},{value:"Returns",id:"returns-6",level:4},{value:"Inherited from",id:"inherited-from-9",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"logInfo()",id:"loginfo",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"message",id:"message-2",level:5},{value:"Returns",id:"returns-7",level:4},{value:"Inherited from",id:"inherited-from-10",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"logWarning()",id:"logwarning",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"message",id:"message-3",level:5},{value:"error?",id:"error-1",level:5},{value:"Returns",id:"returns-8",level:4},{value:"Inherited from",id:"inherited-from-11",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"run()",id:"run",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"sourceFile",id:"sourcefile",level:5},{value:"Returns",id:"returns-9",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-13",level:4}];function o(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,d.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"../../../README.md",children:(0,i.jsx)(n.strong,{children:"Snapper Project"})})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h1,{id:"class-lackofexceptionhandlingdetector",children:"Class: LackOfExceptionHandlingDetector"}),"\n",(0,i.jsx)(n.p,{children:"Detector for identifying lack of exception handling in important functions."}),"\n",(0,i.jsx)(n.h2,{id:"extends",children:"Extends"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"constructors",children:"Constructors"}),"\n",(0,i.jsx)(n.h3,{id:"new-lackofexceptionhandlingdetector",children:"new LackOfExceptionHandlingDetector()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"new LackOfExceptionHandlingDetector"}),"(): ",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector",children:(0,i.jsx)(n.code,{children:"LackOfExceptionHandlingDetector"})})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector",children:(0,i.jsx)(n.code,{children:"LackOfExceptionHandlingDetector"})})}),"\n",(0,i.jsx)(n.h4,{id:"overrides",children:"Overrides"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#constructors",children:(0,i.jsx)(n.code,{children:"constructor"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/LackOfExceptionHandling.ts#L29",children:"detectors/LackOfExceptionHandling.ts:29"})}),"\n",(0,i.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(n.h3,{id:"allowedfileregexes",children:"allowedFileRegexes"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"allowedFileRegexes"}),": ",(0,i.jsx)(n.code,{children:"RegExp"}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#allowedfileregexes",children:(0,i.jsx)(n.code,{children:"allowedFileRegexes"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L19",children:"detectors/DetectorBase.ts:19"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"findings",children:"findings"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"findings"}),": ",(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[] = ",(0,i.jsx)(n.code,{children:"[]"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#findings",children:(0,i.jsx)(n.code,{children:"findings"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L16",children:"detectors/DetectorBase.ts:16"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"name",children:"name"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"name"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#name",children:(0,i.jsx)(n.code,{children:"name"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L14",children:"detectors/DetectorBase.ts:14"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"riskrating",children:"riskRating"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"riskRating"}),": ",(0,i.jsx)(n.a,{href:"/Snapper/API/structures/enumerations/RiskRating",children:(0,i.jsx)(n.code,{children:"RiskRating"})})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-3",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#riskrating",children:(0,i.jsx)(n.code,{children:"riskRating"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L15",children:"detectors/DetectorBase.ts:15"})}),"\n",(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.h3,{id:"addfinding",children:"addFinding()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"addFinding"}),"(",(0,i.jsx)(n.code,{children:"description"}),", ",(0,i.jsx)(n.code,{children:"filePath"}),", ",(0,i.jsx)(n.code,{children:"lineNum"}),"): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Adds a finding to the findings array.\nThis method creates a Finding object and logs a debug message before adding it to the findings list."}),"\n",(0,i.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"description",children:"description"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.p,{children:"Description of the finding."}),"\n",(0,i.jsx)(n.h5,{id:"filepath",children:"filePath"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.p,{children:"Path of the file where the finding was detected."}),"\n",(0,i.jsx)(n.h5,{id:"linenum",children:"lineNum"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"number"})," = ",(0,i.jsx)(n.code,{children:"1"})]}),"\n",(0,i.jsx)(n.p,{children:"Line number where the finding was detected (default is 1)."}),"\n",(0,i.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-4",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#addfinding",children:(0,i.jsx)(n.code,{children:"addFinding"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L41",children:"detectors/DetectorBase.ts:41"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"clearfindings",children:"clearFindings()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"clearFindings"}),"(): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Clears all findings from the detector.\nThis method resets the findings array to an empty state."}),"\n",(0,i.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-5",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#clearfindings",children:(0,i.jsx)(n.code,{children:"clearFindings"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L59",children:"detectors/DetectorBase.ts:59"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"getfindings",children:"getFindings()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"getFindings"}),"(): ",(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Retrieves all findings collected by the detector."}),"\n",(0,i.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[]"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Array of findings."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-6",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#getfindings",children:(0,i.jsx)(n.code,{children:"getFindings"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L75",children:"detectors/DetectorBase.ts:75"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"getname",children:"getName()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"getName"}),"(): ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Gets the name of the detector."}),"\n",(0,i.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The name of the detector."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-7",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#getname",children:(0,i.jsx)(n.code,{children:"getName"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-8",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L67",children:"detectors/DetectorBase.ts:67"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"logdebug",children:"logDebug()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"logDebug"}),"(",(0,i.jsx)(n.code,{children:"message"}),"): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Logs a debug message.\nThis method formats the message with the detector's name and logs it at the debug level."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"message",children:"message"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.p,{children:"The message to log."}),"\n",(0,i.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-8",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#logdebug",children:(0,i.jsx)(n.code,{children:"logDebug"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-9",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L93",children:"detectors/DetectorBase.ts:93"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"logerror",children:"logError()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"logError"}),"(",(0,i.jsx)(n.code,{children:"message"}),", ",(0,i.jsx)(n.code,{children:"error"}),"?): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Logs an error message.\nThis method formats the message with the detector's name and logs it at the error level."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"message-1",children:"message"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.p,{children:"The message to log."}),"\n",(0,i.jsx)(n.h5,{id:"error",children:"error?"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"Error"})}),"\n",(0,i.jsx)(n.p,{children:"Optional error object to log alongside the message."}),"\n",(0,i.jsx)(n.h4,{id:"returns-6",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-9",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#logerror",children:(0,i.jsx)(n.code,{children:"logError"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-10",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L103",children:"detectors/DetectorBase.ts:103"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"loginfo",children:"logInfo()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"logInfo"}),"(",(0,i.jsx)(n.code,{children:"message"}),"): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Logs an informational message.\nThis method formats the message with the detector's name and logs it at the info level."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"message-2",children:"message"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.p,{children:"The message to log."}),"\n",(0,i.jsx)(n.h4,{id:"returns-7",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-10",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#loginfo",children:(0,i.jsx)(n.code,{children:"logInfo"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-11",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L84",children:"detectors/DetectorBase.ts:84"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"logwarning",children:"logWarning()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"logWarning"}),"(",(0,i.jsx)(n.code,{children:"message"}),", ",(0,i.jsx)(n.code,{children:"error"}),"?): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Logs a warning message.\nThis method formats the message with the detector's name and logs it at the warning level."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"message-3",children:"message"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsx)(n.p,{children:"The message to log."}),"\n",(0,i.jsx)(n.h5,{id:"error-1",children:"error?"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"Error"})}),"\n",(0,i.jsx)(n.p,{children:"Optional error object to log alongside the message."}),"\n",(0,i.jsx)(n.h4,{id:"returns-8",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"inherited-from-11",children:"Inherited from"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#logwarning",children:(0,i.jsx)(n.code,{children:"logWarning"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-12",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L113",children:"detectors/DetectorBase.ts:113"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"run",children:"run()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"run"}),"(",(0,i.jsx)(n.code,{children:"sourceFile"}),"): ",(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Runs the detector on the given source file."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,i.jsx)(n.h5,{id:"sourcefile",children:"sourceFile"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"SourceFile"})}),"\n",(0,i.jsx)(n.p,{children:"The source file to analyze."}),"\n",(0,i.jsx)(n.h4,{id:"returns-9",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[]"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Array of findings detailing the detected issues."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"overrides-1",children:"Overrides"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})}),".",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#run",children:(0,i.jsx)(n.code,{children:"run"})})]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-13",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/LackOfExceptionHandling.ts#L38",children:"detectors/LackOfExceptionHandling.ts:38"})})]})}function h(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>t,x:()=>c});var s=r(6540);const i={},d=s.createContext(i);function t(e){const n=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(d.Provider,{value:n},e.children)}}}]);