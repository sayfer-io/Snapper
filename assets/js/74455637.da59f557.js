"use strict";(self.webpackChunksnapper_docs=self.webpackChunksnapper_docs||[]).push([[2984],{2794:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>t,metadata:()=>n,toc:()=>a});const n=JSON.parse('{"id":"API/detectors/DeprecatedPermissions/classes/DeprecatedPermissionsDetector","title":"DeprecatedPermissionsDetector","description":"Snapper Project","source":"@site/docs/API/detectors/DeprecatedPermissions/classes/DeprecatedPermissionsDetector.md","sourceDirName":"API/detectors/DeprecatedPermissions/classes","slug":"/API/detectors/DeprecatedPermissions/classes/DeprecatedPermissionsDetector","permalink":"/Snapper/API/detectors/DeprecatedPermissions/classes/DeprecatedPermissionsDetector","draft":false,"unlisted":false,"editUrl":"https://github.com/sayfer-io/Snapper/blob/main/docs/API/detectors/DeprecatedPermissions/classes/DeprecatedPermissionsDetector.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"DeprecatedFunctionsDetector","permalink":"/Snapper/API/detectors/DeprecatedFunctions/classes/DeprecatedFunctionsDetector"},"next":{"title":"DetectorBase","permalink":"/Snapper/API/detectors/DetectorBase/classes/DetectorBase"}}');var i=r(4848),d=r(8453);const t={},c=void 0,l={},a=[{value:"Extends",id:"extends",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new DeprecatedPermissionsDetector()",id:"new-deprecatedpermissionsdetector",level:3},{value:"Returns",id:"returns",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"allowedFileRegexes",id:"allowedfileregexes",level:3},{value:"Overrides",id:"overrides-1",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"findings",id:"findings",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"riskRating",id:"riskrating",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-4",level:4},{value:"Methods",id:"methods",level:2},{value:"addFinding()",id:"addfinding",level:3},{value:"Parameters",id:"parameters",level:4},{value:"description",id:"description",level:5},{value:"filePath",id:"filepath",level:5},{value:"lineNum",id:"linenum",level:5},{value:"Returns",id:"returns-1",level:4},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"clearFindings()",id:"clearfindings",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Inherited from",id:"inherited-from-4",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"getFindings()",id:"getfindings",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Inherited from",id:"inherited-from-5",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"getName()",id:"getname",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Inherited from",id:"inherited-from-6",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"logDebug()",id:"logdebug",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"message",id:"message",level:5},{value:"Returns",id:"returns-5",level:4},{value:"Inherited from",id:"inherited-from-7",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"logError()",id:"logerror",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"message",id:"message-1",level:5},{value:"error?",id:"error",level:5},{value:"Returns",id:"returns-6",level:4},{value:"Inherited from",id:"inherited-from-8",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"logInfo()",id:"loginfo",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"message",id:"message-2",level:5},{value:"Returns",id:"returns-7",level:4},{value:"Inherited from",id:"inherited-from-9",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"logWarning()",id:"logwarning",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"message",id:"message-3",level:5},{value:"error?",id:"error-1",level:5},{value:"Returns",id:"returns-8",level:4},{value:"Inherited from",id:"inherited-from-10",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"run()",id:"run",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"sourceFile",id:"sourcefile",level:5},{value:"Returns",id:"returns-9",level:4},{value:"Overrides",id:"overrides-2",level:4},{value:"Defined in",id:"defined-in-13",level:4}];function o(e){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,d.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"../../../README.md",children:(0,i.jsx)(s.strong,{children:"Snapper Project"})})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h1,{id:"class-deprecatedpermissionsdetector",children:"Class: DeprecatedPermissionsDetector"}),"\n",(0,i.jsx)(s.p,{children:"Class to detect deprecated permissions in the snap.manifest.json file.\nThis detector checks for deprecated permissions that should not be used in the current implementation\nof the Snap. It raises warnings when deprecated permissions are found."}),"\n",(0,i.jsx)(s.h2,{id:"extends",children:"Extends"}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})})}),"\n"]}),"\n",(0,i.jsx)(s.h2,{id:"constructors",children:"Constructors"}),"\n",(0,i.jsx)(s.h3,{id:"new-deprecatedpermissionsdetector",children:"new DeprecatedPermissionsDetector()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"new DeprecatedPermissionsDetector"}),"(): ",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DeprecatedPermissions/classes/DeprecatedPermissionsDetector",children:(0,i.jsx)(s.code,{children:"DeprecatedPermissionsDetector"})})]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Constructor for the DeprecatedPermissionsDetector.\nInitializes the detector with a name and assigns it a high-risk rating, as using deprecated permissions\ncan lead to security vulnerabilities or unstable behavior in the Snap."}),"\n",(0,i.jsx)(s.h4,{id:"returns",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DeprecatedPermissions/classes/DeprecatedPermissionsDetector",children:(0,i.jsx)(s.code,{children:"DeprecatedPermissionsDetector"})})}),"\n",(0,i.jsx)(s.h4,{id:"overrides",children:"Overrides"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#constructors",children:(0,i.jsx)(s.code,{children:"constructor"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DeprecatedPermissions.ts#L30",children:"detectors/DeprecatedPermissions.ts:30"})}),"\n",(0,i.jsx)(s.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(s.h3,{id:"allowedfileregexes",children:"allowedFileRegexes"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"allowedFileRegexes"}),": ",(0,i.jsx)(s.code,{children:"RegExp"}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(s.h4,{id:"overrides-1",children:"Overrides"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#allowedfileregexes",children:(0,i.jsx)(s.code,{children:"allowedFileRegexes"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DeprecatedPermissions.ts#L34",children:"detectors/DeprecatedPermissions.ts:34"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"findings",children:"findings"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"protected"})," ",(0,i.jsx)(s.strong,{children:"findings"}),": ",(0,i.jsx)(s.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(s.code,{children:"Finding"})}),"[] = ",(0,i.jsx)(s.code,{children:"[]"})]}),"\n"]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#findings",children:(0,i.jsx)(s.code,{children:"findings"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L16",children:"detectors/DetectorBase.ts:16"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"name",children:"name"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"protected"})," ",(0,i.jsx)(s.strong,{children:"name"}),": ",(0,i.jsx)(s.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-1",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#name",children:(0,i.jsx)(s.code,{children:"name"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L14",children:"detectors/DetectorBase.ts:14"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"riskrating",children:"riskRating"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"protected"})," ",(0,i.jsx)(s.strong,{children:"riskRating"}),": ",(0,i.jsx)(s.a,{href:"/Snapper/API/structures/enumerations/RiskRating",children:(0,i.jsx)(s.code,{children:"RiskRating"})})]}),"\n"]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-2",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#riskrating",children:(0,i.jsx)(s.code,{children:"riskRating"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L15",children:"detectors/DetectorBase.ts:15"})}),"\n",(0,i.jsx)(s.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(s.h3,{id:"addfinding",children:"addFinding()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"addFinding"}),"(",(0,i.jsx)(s.code,{children:"description"}),", ",(0,i.jsx)(s.code,{children:"filePath"}),", ",(0,i.jsx)(s.code,{children:"lineNum"}),"): ",(0,i.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Adds a finding to the findings array.\nThis method creates a Finding object and logs a debug message before adding it to the findings list."}),"\n",(0,i.jsx)(s.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsx)(s.h5,{id:"description",children:"description"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsx)(s.p,{children:"Description of the finding."}),"\n",(0,i.jsx)(s.h5,{id:"filepath",children:"filePath"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsx)(s.p,{children:"Path of the file where the finding was detected."}),"\n",(0,i.jsx)(s.h5,{id:"linenum",children:"lineNum"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.code,{children:"number"})," = ",(0,i.jsx)(s.code,{children:"1"})]}),"\n",(0,i.jsx)(s.p,{children:"Line number where the finding was detected (default is 1)."}),"\n",(0,i.jsx)(s.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"void"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-3",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#addfinding",children:(0,i.jsx)(s.code,{children:"addFinding"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L41",children:"detectors/DetectorBase.ts:41"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"clearfindings",children:"clearFindings()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"clearFindings"}),"(): ",(0,i.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Clears all findings from the detector.\nThis method resets the findings array to an empty state."}),"\n",(0,i.jsx)(s.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"void"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-4",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#clearfindings",children:(0,i.jsx)(s.code,{children:"clearFindings"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L59",children:"detectors/DetectorBase.ts:59"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"getfindings",children:"getFindings()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"getFindings"}),"(): ",(0,i.jsx)(s.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(s.code,{children:"Finding"})}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Retrieves all findings collected by the detector."}),"\n",(0,i.jsx)(s.h4,{id:"returns-3",children:"Returns"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(s.code,{children:"Finding"})}),"[]"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Array of findings."}),"\n"]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-5",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#getfindings",children:(0,i.jsx)(s.code,{children:"getFindings"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L75",children:"detectors/DetectorBase.ts:75"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"getname",children:"getName()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"getName"}),"(): ",(0,i.jsx)(s.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Gets the name of the detector."}),"\n",(0,i.jsx)(s.h4,{id:"returns-4",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"The name of the detector."}),"\n"]}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-6",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#getname",children:(0,i.jsx)(s.code,{children:"getName"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-8",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L67",children:"detectors/DetectorBase.ts:67"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"logdebug",children:"logDebug()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"logDebug"}),"(",(0,i.jsx)(s.code,{children:"message"}),"): ",(0,i.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Logs a debug message.\nThis method formats the message with the detector's name and logs it at the debug level."}),"\n",(0,i.jsx)(s.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsx)(s.h5,{id:"message",children:"message"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsx)(s.p,{children:"The message to log."}),"\n",(0,i.jsx)(s.h4,{id:"returns-5",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"void"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-7",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#logdebug",children:(0,i.jsx)(s.code,{children:"logDebug"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-9",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L93",children:"detectors/DetectorBase.ts:93"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"logerror",children:"logError()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"logError"}),"(",(0,i.jsx)(s.code,{children:"message"}),", ",(0,i.jsx)(s.code,{children:"error"}),"?): ",(0,i.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Logs an error message.\nThis method formats the message with the detector's name and logs it at the error level."}),"\n",(0,i.jsx)(s.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsx)(s.h5,{id:"message-1",children:"message"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsx)(s.p,{children:"The message to log."}),"\n",(0,i.jsx)(s.h5,{id:"error",children:"error?"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"Error"})}),"\n",(0,i.jsx)(s.p,{children:"Optional error object to log alongside the message."}),"\n",(0,i.jsx)(s.h4,{id:"returns-6",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"void"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-8",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#logerror",children:(0,i.jsx)(s.code,{children:"logError"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-10",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L103",children:"detectors/DetectorBase.ts:103"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"loginfo",children:"logInfo()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"logInfo"}),"(",(0,i.jsx)(s.code,{children:"message"}),"): ",(0,i.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Logs an informational message.\nThis method formats the message with the detector's name and logs it at the info level."}),"\n",(0,i.jsx)(s.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,i.jsx)(s.h5,{id:"message-2",children:"message"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsx)(s.p,{children:"The message to log."}),"\n",(0,i.jsx)(s.h4,{id:"returns-7",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"void"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-9",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#loginfo",children:(0,i.jsx)(s.code,{children:"logInfo"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-11",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L84",children:"detectors/DetectorBase.ts:84"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"logwarning",children:"logWarning()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"logWarning"}),"(",(0,i.jsx)(s.code,{children:"message"}),", ",(0,i.jsx)(s.code,{children:"error"}),"?): ",(0,i.jsx)(s.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Logs a warning message.\nThis method formats the message with the detector's name and logs it at the warning level."}),"\n",(0,i.jsx)(s.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,i.jsx)(s.h5,{id:"message-3",children:"message"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"string"})}),"\n",(0,i.jsx)(s.p,{children:"The message to log."}),"\n",(0,i.jsx)(s.h5,{id:"error-1",children:"error?"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"Error"})}),"\n",(0,i.jsx)(s.p,{children:"Optional error object to log alongside the message."}),"\n",(0,i.jsx)(s.h4,{id:"returns-8",children:"Returns"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"void"})}),"\n",(0,i.jsx)(s.h4,{id:"inherited-from-10",children:"Inherited from"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#logwarning",children:(0,i.jsx)(s.code,{children:"logWarning"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-12",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DetectorBase.ts#L113",children:"detectors/DetectorBase.ts:113"})}),"\n",(0,i.jsx)(s.hr,{}),"\n",(0,i.jsx)(s.h3,{id:"run",children:"run()"}),"\n",(0,i.jsxs)(s.blockquote,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"run"}),"(",(0,i.jsx)(s.code,{children:"sourceFile"}),"): ",(0,i.jsx)(s.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(s.code,{children:"Finding"})}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(s.p,{children:"Runs the detector on the given source file to identify any deprecated permissions.\nIt checks if the permissions in the manifest match any deprecated ones and records findings accordingly."}),"\n",(0,i.jsx)(s.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,i.jsx)(s.h5,{id:"sourcefile",children:"sourceFile"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.code,{children:"SourceFile"})}),"\n",(0,i.jsx)(s.p,{children:"The source file to analyze for deprecated permissions."}),"\n",(0,i.jsx)(s.h4,{id:"returns-9",children:"Returns"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(s.code,{children:"Finding"})}),"[]"]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsx)(s.li,{children:"Array of findings with details about the detected deprecated permissions."}),"\n"]}),"\n",(0,i.jsx)(s.h4,{id:"overrides-2",children:"Overrides"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(s.code,{children:"DetectorBase"})}),".",(0,i.jsx)(s.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase#run",children:(0,i.jsx)(s.code,{children:"run"})})]}),"\n",(0,i.jsx)(s.h4,{id:"defined-in-13",children:"Defined in"}),"\n",(0,i.jsx)(s.p,{children:(0,i.jsx)(s.a,{href:"https://github.com/sayfer-io/Snapper/blob/380d1affe9c6733262cea54bfed8fcfa8ec4b3ba/detectors/DeprecatedPermissions.ts#L55",children:"detectors/DeprecatedPermissions.ts:55"})})]})}function h(e={}){const{wrapper:s}={...(0,d.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},8453:(e,s,r)=>{r.d(s,{R:()=>t,x:()=>c});var n=r(6540);const i={},d=n.createContext(i);function t(e){const s=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),n.createElement(d.Provider,{value:s},e.children)}}}]);