"use strict";(self.webpackChunksnapper_docs=self.webpackChunksnapper_docs||[]).push([[12],{8747:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>c,default:()=>a,frontMatter:()=>t,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"API/detectors/UsedBeforeDefinedArrowFunctions/classes/UsedBeforeDefinedArrowFunctionsDetector","title":"UsedBeforeDefinedArrowFunctionsDetector","description":"Snapper Project","source":"@site/docs/API/detectors/UsedBeforeDefinedArrowFunctions/classes/UsedBeforeDefinedArrowFunctionsDetector.md","sourceDirName":"API/detectors/UsedBeforeDefinedArrowFunctions/classes","slug":"/API/detectors/UsedBeforeDefinedArrowFunctions/classes/UsedBeforeDefinedArrowFunctionsDetector","permalink":"/Snapper/API/detectors/UsedBeforeDefinedArrowFunctions/classes/UsedBeforeDefinedArrowFunctionsDetector","draft":false,"unlisted":false,"editUrl":"https://github.com/sayfer-io/Snapper/blob/main/docs/API/detectors/UsedBeforeDefinedArrowFunctions/classes/UsedBeforeDefinedArrowFunctionsDetector.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"UnusedVariablesDetector","permalink":"/Snapper/API/detectors/UnusedVariables/classes/UnusedVariablesDetector"},"next":{"title":"UsedBeforeDefinedFunctionsDetector","permalink":"/Snapper/API/detectors/UsedBeforeDefinedFunctions/classes/UsedBeforeDefinedFunctionsDetector"}}');var i=n(4848),d=n(8453);const t={},c=void 0,l={},o=[{value:"Extends",id:"extends",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new UsedBeforeDefinedArrowFunctionsDetector()",id:"new-usedbeforedefinedarrowfunctionsdetector",level:3},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"allowedFileRegexes",id:"allowedfileregexes",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"findings",id:"findings",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"riskRating",id:"riskrating",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"Methods",id:"methods",level:2},{value:"addFinding()",id:"addfinding",level:3},{value:"Parameters",id:"parameters",level:4},{value:"description",id:"description",level:5},{value:"filePath",id:"filepath",level:5},{value:"lineNum",id:"linenum",level:5},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"clearFindings()",id:"clearfindings",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"getFindings()",id:"getfindings",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"getName()",id:"getname",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"logDebug()",id:"logdebug",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"message",id:"message",level:5},{value:"Returns",id:"returns-5",level:4},{value:"Inherited from",id:"inherited-from-8",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"logError()",id:"logerror",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"message",id:"message-1",level:5},{value:"error?",id:"error",level:5},{value:"Returns",id:"returns-6",level:4},{value:"Inherited from",id:"inherited-from-9",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"logInfo()",id:"loginfo",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"message",id:"message-2",level:5},{value:"Returns",id:"returns-7",level:4},{value:"Inherited from",id:"inherited-from-10",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"logWarning()",id:"logwarning",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"message",id:"message-3",level:5},{value:"error?",id:"error-1",level:5},{value:"Returns",id:"returns-8",level:4},{value:"Inherited from",id:"inherited-from-11",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"run()",id:"run",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"sourceFile",id:"sourcefile",level:5},{value:"Returns",id:"returns-9",level:4},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-13",level:4}];function h(e){const r={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,d.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"../../../README.md",children:(0,i.jsx)(r.strong,{children:"Snapper Project"})})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h1,{id:"class-usedbeforedefinedarrowfunctionsdetector",children:"Class: UsedBeforeDefinedArrowFunctionsDetector"}),"\n",(0,i.jsx)(r.p,{children:"Class to detect if arrow functions are used before they are defined in the given file.\nThis detector scans the source code for arrow function declarations and their usages,\nreporting any instances where an arrow function is called before it is declared."}),"\n",(0,i.jsx)(r.h2,{id:"extends",children:"Extends"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})})}),"\n"]}),"\n",(0,i.jsx)(r.h2,{id:"constructors",children:"Constructors"}),"\n",(0,i.jsx)(r.h3,{id:"new-usedbeforedefinedarrowfunctionsdetector",children:"new UsedBeforeDefinedArrowFunctionsDetector()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"new UsedBeforeDefinedArrowFunctionsDetector"}),"(): ",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/UsedBeforeDefinedArrowFunctions/classes/UsedBeforeDefinedArrowFunctionsDetector",children:(0,i.jsx)(r.code,{children:"UsedBeforeDefinedArrowFunctionsDetector"})})]}),"\n"]}),"\n",(0,i.jsx)(r.h4,{id:"returns",children:"Returns"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/UsedBeforeDefinedArrowFunctions/classes/UsedBeforeDefinedArrowFunctionsDetector",children:(0,i.jsx)(r.code,{children:"UsedBeforeDefinedArrowFunctionsDetector"})})}),"\n",(0,i.jsx)(r.h4,{id:"overrides",children:"Overrides"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#constructors",children:(0,i.jsx)(r.code,{children:"constructor"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/UsedBeforeDefinedArrowFunctions.ts#L13",children:"detectors/UsedBeforeDefinedArrowFunctions.ts:13"})}),"\n",(0,i.jsx)(r.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(r.h3,{id:"allowedfileregexes",children:"allowedFileRegexes"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"allowedFileRegexes"}),": ",(0,i.jsx)(r.code,{children:"RegExp"}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#allowedfileregexes",children:(0,i.jsx)(r.code,{children:"allowedFileRegexes"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L19",children:"detectors/DetectorBase.ts:19"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"findings",children:"findings"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.code,{children:"protected"})," ",(0,i.jsx)(r.strong,{children:"findings"}),": ",(0,i.jsx)(r.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(r.code,{children:"Finding"})}),"[] = ",(0,i.jsx)(r.code,{children:"[]"})]}),"\n"]}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#findings",children:(0,i.jsx)(r.code,{children:"findings"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L16",children:"detectors/DetectorBase.ts:16"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"name",children:"name"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.code,{children:"protected"})," ",(0,i.jsx)(r.strong,{children:"name"}),": ",(0,i.jsx)(r.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#name",children:(0,i.jsx)(r.code,{children:"name"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L14",children:"detectors/DetectorBase.ts:14"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"riskrating",children:"riskRating"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.code,{children:"protected"})," ",(0,i.jsx)(r.strong,{children:"riskRating"}),": ",(0,i.jsx)(r.a,{href:"/Snapper/API/structures/enumerations/RiskRating",children:(0,i.jsx)(r.code,{children:"RiskRating"})})]}),"\n"]}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-3",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#riskrating",children:(0,i.jsx)(r.code,{children:"riskRating"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L15",children:"detectors/DetectorBase.ts:15"})}),"\n",(0,i.jsx)(r.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(r.h3,{id:"addfinding",children:"addFinding()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"addFinding"}),"(",(0,i.jsx)(r.code,{children:"description"}),", ",(0,i.jsx)(r.code,{children:"filePath"}),", ",(0,i.jsx)(r.code,{children:"lineNum"}),"): ",(0,i.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Adds a finding to the findings array.\nThis method creates a Finding object and logs a debug message before adding it to the findings list."}),"\n",(0,i.jsx)(r.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(r.h5,{id:"description",children:"description"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"string"})}),"\n",(0,i.jsx)(r.p,{children:"Description of the finding."}),"\n",(0,i.jsx)(r.h5,{id:"filepath",children:"filePath"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"string"})}),"\n",(0,i.jsx)(r.p,{children:"Path of the file where the finding was detected."}),"\n",(0,i.jsx)(r.h5,{id:"linenum",children:"lineNum"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.code,{children:"number"})," = ",(0,i.jsx)(r.code,{children:"1"})]}),"\n",(0,i.jsx)(r.p,{children:"Line number where the finding was detected (default is 1)."}),"\n",(0,i.jsx)(r.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"void"})}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-4",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#addfinding",children:(0,i.jsx)(r.code,{children:"addFinding"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L41",children:"detectors/DetectorBase.ts:41"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"clearfindings",children:"clearFindings()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"clearFindings"}),"(): ",(0,i.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Clears all findings from the detector.\nThis method resets the findings array to an empty state."}),"\n",(0,i.jsx)(r.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"void"})}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-5",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#clearfindings",children:(0,i.jsx)(r.code,{children:"clearFindings"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L59",children:"detectors/DetectorBase.ts:59"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"getfindings",children:"getFindings()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"getFindings"}),"(): ",(0,i.jsx)(r.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(r.code,{children:"Finding"})}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Retrieves all findings collected by the detector."}),"\n",(0,i.jsx)(r.h4,{id:"returns-3",children:"Returns"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(r.code,{children:"Finding"})}),"[]"]}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"Array of findings."}),"\n"]}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-6",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#getfindings",children:(0,i.jsx)(r.code,{children:"getFindings"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L75",children:"detectors/DetectorBase.ts:75"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"getname",children:"getName()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"getName"}),"(): ",(0,i.jsx)(r.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Gets the name of the detector."}),"\n",(0,i.jsx)(r.h4,{id:"returns-4",children:"Returns"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"string"})}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"The name of the detector."}),"\n"]}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-7",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#getname",children:(0,i.jsx)(r.code,{children:"getName"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-8",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L67",children:"detectors/DetectorBase.ts:67"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"logdebug",children:"logDebug()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"logDebug"}),"(",(0,i.jsx)(r.code,{children:"message"}),"): ",(0,i.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Logs a debug message.\nThis method formats the message with the detector's name and logs it at the debug level."}),"\n",(0,i.jsx)(r.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsx)(r.h5,{id:"message",children:"message"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"string"})}),"\n",(0,i.jsx)(r.p,{children:"The message to log."}),"\n",(0,i.jsx)(r.h4,{id:"returns-5",children:"Returns"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"void"})}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-8",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#logdebug",children:(0,i.jsx)(r.code,{children:"logDebug"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-9",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L93",children:"detectors/DetectorBase.ts:93"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"logerror",children:"logError()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"logError"}),"(",(0,i.jsx)(r.code,{children:"message"}),", ",(0,i.jsx)(r.code,{children:"error"}),"?): ",(0,i.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Logs an error message.\nThis method formats the message with the detector's name and logs it at the error level."}),"\n",(0,i.jsx)(r.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsx)(r.h5,{id:"message-1",children:"message"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"string"})}),"\n",(0,i.jsx)(r.p,{children:"The message to log."}),"\n",(0,i.jsx)(r.h5,{id:"error",children:"error?"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"Error"})}),"\n",(0,i.jsx)(r.p,{children:"Optional error object to log alongside the message."}),"\n",(0,i.jsx)(r.h4,{id:"returns-6",children:"Returns"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"void"})}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-9",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#logerror",children:(0,i.jsx)(r.code,{children:"logError"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-10",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L103",children:"detectors/DetectorBase.ts:103"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"loginfo",children:"logInfo()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"logInfo"}),"(",(0,i.jsx)(r.code,{children:"message"}),"): ",(0,i.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Logs an informational message.\nThis method formats the message with the detector's name and logs it at the info level."}),"\n",(0,i.jsx)(r.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,i.jsx)(r.h5,{id:"message-2",children:"message"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"string"})}),"\n",(0,i.jsx)(r.p,{children:"The message to log."}),"\n",(0,i.jsx)(r.h4,{id:"returns-7",children:"Returns"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"void"})}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-10",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#loginfo",children:(0,i.jsx)(r.code,{children:"logInfo"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-11",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L84",children:"detectors/DetectorBase.ts:84"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"logwarning",children:"logWarning()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"logWarning"}),"(",(0,i.jsx)(r.code,{children:"message"}),", ",(0,i.jsx)(r.code,{children:"error"}),"?): ",(0,i.jsx)(r.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Logs a warning message.\nThis method formats the message with the detector's name and logs it at the warning level."}),"\n",(0,i.jsx)(r.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,i.jsx)(r.h5,{id:"message-3",children:"message"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"string"})}),"\n",(0,i.jsx)(r.p,{children:"The message to log."}),"\n",(0,i.jsx)(r.h5,{id:"error-1",children:"error?"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"Error"})}),"\n",(0,i.jsx)(r.p,{children:"Optional error object to log alongside the message."}),"\n",(0,i.jsx)(r.h4,{id:"returns-8",children:"Returns"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"void"})}),"\n",(0,i.jsx)(r.h4,{id:"inherited-from-11",children:"Inherited from"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#logwarning",children:(0,i.jsx)(r.code,{children:"logWarning"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-12",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/DetectorBase.ts#L113",children:"detectors/DetectorBase.ts:113"})}),"\n",(0,i.jsx)(r.hr,{}),"\n",(0,i.jsx)(r.h3,{id:"run",children:"run()"}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:"run"}),"(",(0,i.jsx)(r.code,{children:"sourceFile"}),"): ",(0,i.jsx)(r.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(r.code,{children:"Finding"})}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Runs the detector on the given source file to identify arrow functions\nthat are used before they are defined."}),"\n",(0,i.jsx)(r.p,{children:"This method traverses the Abstract Syntax Tree (AST) of the source file to collect\nthe declarations and usages of arrow functions, then checks for any violations\nof the declaration-before-use rule."}),"\n",(0,i.jsx)(r.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,i.jsx)(r.h5,{id:"sourcefile",children:"sourceFile"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.code,{children:"SourceFile"})}),"\n",(0,i.jsx)(r.p,{children:"The source file to analyze."}),"\n",(0,i.jsx)(r.h4,{id:"returns-9",children:"Returns"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(r.code,{children:"Finding"})}),"[]"]}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"Array of findings with details about the detected issues."}),"\n"]}),"\n",(0,i.jsx)(r.h4,{id:"overrides-1",children:"Overrides"}),"\n",(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(r.code,{children:"DetectorBase"})}),".",(0,i.jsx)(r.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#run",children:(0,i.jsx)(r.code,{children:"run"})})]}),"\n",(0,i.jsx)(r.h4,{id:"defined-in-13",children:"Defined in"}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.a,{href:"https://github.com/sayfer-io/Snapper/blob/befb6902c32869c7396a850690d167f8e1536476/detectors/UsedBeforeDefinedArrowFunctions.ts#L28",children:"detectors/UsedBeforeDefinedArrowFunctions.ts:28"})})]})}function a(e={}){const{wrapper:r}={...(0,d.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>t,x:()=>c});var s=n(6540);const i={},d=s.createContext(i);function t(e){const r=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(d.Provider,{value:r},e.children)}}}]);