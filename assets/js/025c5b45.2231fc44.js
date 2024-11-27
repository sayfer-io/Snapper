"use strict";(self.webpackChunksnapper_docs=self.webpackChunksnapper_docs||[]).push([[29],{966:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>t,metadata:()=>r,toc:()=>o});const r=JSON.parse('{"id":"API/detectors/DetectorBase/classes/DetectorBase","title":"DetectorBase","description":"*","source":"@site/docs/API/detectors/DetectorBase/classes/DetectorBase.md","sourceDirName":"API/detectors/DetectorBase/classes","slug":"/API/detectors/DetectorBase/classes/DetectorBase","permalink":"/Snapper/API/detectors/DetectorBase/classes/DetectorBase","draft":false,"unlisted":false,"editUrl":"https://github.com/sayfer-io/Snapper/blob/main/docs/API/detectors/DetectorBase/classes/DetectorBase.md","tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"DeprecatedPermissionsDetector","permalink":"/Snapper/API/detectors/DeprecatedPermissions/classes/DeprecatedPermissionsDetector"},"next":{"title":"ESLintingDetector","permalink":"/Snapper/API/detectors/ESLinting/classes/ESLintingDetector"}}');var i=s(4848),d=s(8453);const t={},c=void 0,l={},o=[{value:"Extended by",id:"extended-by",level:2},{value:"Constructors",id:"constructors",level:2},{value:"new DetectorBase()",id:"new-detectorbase",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"allowedFileRegexes",id:"allowedfileregexes",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"findings",id:"findings",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"name",id:"name",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"riskRating",id:"riskrating",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"Methods",id:"methods",level:2},{value:"addFinding()",id:"addfinding",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"clearFindings()",id:"clearfindings",level:3},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-6",level:4},{value:"getFindings()",id:"getfindings",level:3},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"getName()",id:"getname",level:3},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-8",level:4},{value:"logDebug()",id:"logdebug",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"logError()",id:"logerror",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Defined in",id:"defined-in-10",level:4},{value:"logInfo()",id:"loginfo",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-7",level:4},{value:"Defined in",id:"defined-in-11",level:4},{value:"logWarning()",id:"logwarning",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-8",level:4},{value:"Defined in",id:"defined-in-12",level:4},{value:"run()",id:"run",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-9",level:4},{value:"Defined in",id:"defined-in-13",level:4}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...(0,d.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.hr,{}),"\n",(0,i.jsxs)(n.h1,{id:"class-abstract-detectorbase",children:["Class: ",(0,i.jsx)(n.code,{children:"abstract"})," DetectorBase"]}),"\n",(0,i.jsx)(n.p,{children:"Abstract base class for all detectors.\nThis class provides a common structure and utility methods for specific detectors\nthat will implement the run method to analyze source files for issues."}),"\n",(0,i.jsx)(n.h2,{id:"extended-by",children:"Extended by"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/BroadPermissions/classes/BroadPermissionsDetector",children:(0,i.jsx)(n.code,{children:"BroadPermissionsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/ConsoleLog/classes/ConsoleLogDetector",children:(0,i.jsx)(n.code,{children:"ConsoleLogDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DangerousFunctions/classes/DangerousFunctionsDetector",children:(0,i.jsx)(n.code,{children:"DangerousFunctionsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DependencyOutdated/classes/DependencyOutdatedDetector",children:(0,i.jsx)(n.code,{children:"DependencyOutdatedDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DependencyVersioning/classes/DependencyVersioningDetector",children:(0,i.jsx)(n.code,{children:"DependencyVersioningDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DeprecatedFunctions/classes/DeprecatedFunctionsDetector",children:(0,i.jsx)(n.code,{children:"DeprecatedFunctionsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DeprecatedPermissions/classes/DeprecatedPermissionsDetector",children:(0,i.jsx)(n.code,{children:"DeprecatedPermissionsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/ESLinting/classes/ESLintingDetector",children:(0,i.jsx)(n.code,{children:"ESLintingDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/ExcessiveComments/classes/ExcessiveCommentsDetector",children:(0,i.jsx)(n.code,{children:"ExcessiveCommentsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/FloatingPointPrecision/classes/FloatingPointPrecisionDetector",children:(0,i.jsx)(n.code,{children:"FloatingPointPrecisionDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/HardcodedSecrets/classes/HardcodedSecretsDetector",children:(0,i.jsx)(n.code,{children:"HardcodedSecretsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/ImproperTypeUsage/classes/ImproperTypeUsageDetector",children:(0,i.jsx)(n.code,{children:"ImproperTypeUsageDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/InsecureCryptoLibraries/classes/InsecureCryptoLibrariesDetector",children:(0,i.jsx)(n.code,{children:"InsecureCryptoLibrariesDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/InsecureCryptography/classes/InsecureCryptographyDetector",children:(0,i.jsx)(n.code,{children:"InsecureCryptographyDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/InsecureRandomness/classes/InsecureRandomnessDetector",children:(0,i.jsx)(n.code,{children:"InsecureRandomnessDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/LackOfExceptionHandling/classes/LackOfExceptionHandlingDetector",children:(0,i.jsx)(n.code,{children:"LackOfExceptionHandlingDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/LeftoverTODOs/classes/LeftoverTODOsDetector",children:(0,i.jsx)(n.code,{children:"LeftoverTODOsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/MissingExplicitStrictTypeChecking/classes/MissingExplicitStrictTypeCheckingDetector",children:(0,i.jsx)(n.code,{children:"MissingExplicitStrictTypeCheckingDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/OriginValidation-temp/classes/OriginValidationDetector",children:(0,i.jsx)(n.code,{children:"OriginValidationDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/OriginValidation/classes/OriginValidationDetector",children:(0,i.jsx)(n.code,{children:"OriginValidationDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/PotentialOutdatedEngine/classes/PotentialOutdatedEngineDetector",children:(0,i.jsx)(n.code,{children:"PotentialOutdatedEngineDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/UnhandledPromiseRejection/classes/UnhandledPromiseRejectionDetector",children:(0,i.jsx)(n.code,{children:"UnhandledPromiseRejectionDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/UnusedFunctions/classes/UnusedFunctionsDetector",children:(0,i.jsx)(n.code,{children:"UnusedFunctionsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/UnusedImports/classes/UnusedImportsDetector",children:(0,i.jsx)(n.code,{children:"UnusedImportsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/UnusedPermissions/classes/UnusedPermissionsDetector",children:(0,i.jsx)(n.code,{children:"UnusedPermissionsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/UnusedVariables/classes/UnusedVariablesDetector",children:(0,i.jsx)(n.code,{children:"UnusedVariablesDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/UsedBeforeDefinedArrowFunctions/classes/UsedBeforeDefinedArrowFunctionsDetector",children:(0,i.jsx)(n.code,{children:"UsedBeforeDefinedArrowFunctionsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/UsedBeforeDefinedFunctions/classes/UsedBeforeDefinedFunctionsDetector",children:(0,i.jsx)(n.code,{children:"UsedBeforeDefinedFunctionsDetector"})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/UsedBeforeDefinedInterfaces/classes/UsedBeforeDefinedInterfacesDetector",children:(0,i.jsx)(n.code,{children:"UsedBeforeDefinedInterfacesDetector"})})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"constructors",children:"Constructors"}),"\n",(0,i.jsx)(n.h3,{id:"new-detectorbase",children:"new DetectorBase()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"new DetectorBase"}),"(",(0,i.jsx)(n.code,{children:"name"}),", ",(0,i.jsx)(n.code,{children:"riskRating"}),"): ",(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Constructor to initialize the detector with a name and risk rating."}),"\n",(0,i.jsx)(n.h4,{id:"parameters",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"name"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.p,{children:"The name of the detector."}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"riskRating"}),": ",(0,i.jsx)(n.a,{href:"/Snapper/API/structures/enumerations/RiskRating",children:(0,i.jsx)(n.code,{children:"RiskRating"})})]}),"\n",(0,i.jsx)(n.p,{children:"The risk rating associated with the findings from this detector."}),"\n",(0,i.jsx)(n.h4,{id:"returns",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"/Snapper/API/detectors/DetectorBase/classes/DetectorBase",children:(0,i.jsx)(n.code,{children:"DetectorBase"})})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L26",children:"detectors/DetectorBase.ts:26"})}),"\n",(0,i.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(n.h3,{id:"allowedfileregexes",children:"allowedFileRegexes"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"allowedFileRegexes"}),": ",(0,i.jsx)(n.code,{children:"RegExp"}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-1",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L19",children:"detectors/DetectorBase.ts:19"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"findings",children:"findings"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"findings"}),": ",(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[] = ",(0,i.jsx)(n.code,{children:"[]"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-2",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L16",children:"detectors/DetectorBase.ts:16"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"name",children:"name"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"name"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-3",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L14",children:"detectors/DetectorBase.ts:14"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"riskrating",children:"riskRating"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"protected"})," ",(0,i.jsx)(n.strong,{children:"riskRating"}),": ",(0,i.jsx)(n.a,{href:"/Snapper/API/structures/enumerations/RiskRating",children:(0,i.jsx)(n.code,{children:"RiskRating"})})]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-4",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L15",children:"detectors/DetectorBase.ts:15"})}),"\n",(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.h3,{id:"addfinding",children:"addFinding()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"addFinding"}),"(",(0,i.jsx)(n.code,{children:"description"}),", ",(0,i.jsx)(n.code,{children:"filePath"}),", ",(0,i.jsx)(n.code,{children:"lineNum"}),"): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Adds a finding to the findings array.\nThis method creates a Finding object and logs a debug message before adding it to the findings list."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-1",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"description"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.p,{children:"Description of the finding."}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"filePath"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.p,{children:"Path of the file where the finding was detected."}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"lineNum"}),": ",(0,i.jsx)(n.code,{children:"number"})," = ",(0,i.jsx)(n.code,{children:"1"})]}),"\n",(0,i.jsx)(n.p,{children:"Line number where the finding was detected (default is 1)."}),"\n",(0,i.jsx)(n.h4,{id:"returns-1",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-5",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L41",children:"detectors/DetectorBase.ts:41"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"clearfindings",children:"clearFindings()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"clearFindings"}),"(): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Clears all findings from the detector.\nThis method resets the findings array to an empty state."}),"\n",(0,i.jsx)(n.h4,{id:"returns-2",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-6",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L59",children:"detectors/DetectorBase.ts:59"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"getfindings",children:"getFindings()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"getFindings"}),"(): ",(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[]"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Retrieves all findings collected by the detector."}),"\n",(0,i.jsx)(n.h4,{id:"returns-3",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[]"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Array of findings."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-7",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L75",children:"detectors/DetectorBase.ts:75"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"getname",children:"getName()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"getName"}),"(): ",(0,i.jsx)(n.code,{children:"string"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Gets the name of the detector."}),"\n",(0,i.jsx)(n.h4,{id:"returns-4",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"string"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The name of the detector."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-8",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L67",children:"detectors/DetectorBase.ts:67"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"logdebug",children:"logDebug()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"logDebug"}),"(",(0,i.jsx)(n.code,{children:"message"}),"): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Logs a debug message.\nThis method formats the message with the detector's name and logs it at the debug level."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-2",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"message"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.p,{children:"The message to log."}),"\n",(0,i.jsx)(n.h4,{id:"returns-5",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-9",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L93",children:"detectors/DetectorBase.ts:93"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"logerror",children:"logError()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"logError"}),"(",(0,i.jsx)(n.code,{children:"message"}),", ",(0,i.jsx)(n.code,{children:"error"}),"?): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Logs an error message.\nThis method formats the message with the detector's name and logs it at the error level."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-3",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"message"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.p,{children:"The message to log."}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"error?"}),": ",(0,i.jsx)(n.code,{children:"Error"})]}),"\n",(0,i.jsx)(n.p,{children:"Optional error object to log alongside the message."}),"\n",(0,i.jsx)(n.h4,{id:"returns-6",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-10",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L103",children:"detectors/DetectorBase.ts:103"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"loginfo",children:"logInfo()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"logInfo"}),"(",(0,i.jsx)(n.code,{children:"message"}),"): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Logs an informational message.\nThis method formats the message with the detector's name and logs it at the info level."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-4",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"message"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.p,{children:"The message to log."}),"\n",(0,i.jsx)(n.h4,{id:"returns-7",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-11",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L84",children:"detectors/DetectorBase.ts:84"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"logwarning",children:"logWarning()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"logWarning"}),"(",(0,i.jsx)(n.code,{children:"message"}),", ",(0,i.jsx)(n.code,{children:"error"}),"?): ",(0,i.jsx)(n.code,{children:"void"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Logs a warning message.\nThis method formats the message with the detector's name and logs it at the warning level."}),"\n",(0,i.jsx)(n.h4,{id:"parameters-5",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"message"}),": ",(0,i.jsx)(n.code,{children:"string"})]}),"\n",(0,i.jsx)(n.p,{children:"The message to log."}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"error?"}),": ",(0,i.jsx)(n.code,{children:"Error"})]}),"\n",(0,i.jsx)(n.p,{children:"Optional error object to log alongside the message."}),"\n",(0,i.jsx)(n.h4,{id:"returns-8",children:"Returns"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"void"})}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-12",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L113",children:"detectors/DetectorBase.ts:113"})}),"\n",(0,i.jsx)(n.hr,{}),"\n",(0,i.jsx)(n.h3,{id:"run",children:"run()"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"abstract"})," ",(0,i.jsx)(n.strong,{children:"run"}),"(",(0,i.jsx)(n.code,{children:"file"}),"): ",(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[] | ",(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[]>"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"parameters-6",children:"Parameters"}),"\n",(0,i.jsxs)(n.p,{children:["\u2022 ",(0,i.jsx)(n.strong,{children:"file"}),": ",(0,i.jsx)(n.code,{children:"SourceFile"})]}),"\n",(0,i.jsx)(n.h4,{id:"returns-9",children:"Returns"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[] | ",(0,i.jsx)(n.code,{children:"Promise"}),"<",(0,i.jsx)(n.a,{href:"/Snapper/API/types/type-aliases/Finding",children:(0,i.jsx)(n.code,{children:"Finding"})}),"[]>"]}),"\n",(0,i.jsx)(n.h4,{id:"defined-in-13",children:"Defined in"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://github.com/sayfer-io/Snapper/blob/540f56f149a8e817e5156da8e017fbe261c9c415/detectors/DetectorBase.ts#L32",children:"detectors/DetectorBase.ts:32"})})]})}function h(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>c});var r=s(6540);const i={},d=r.createContext(i);function t(e){const n=r.useContext(d);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(d.Provider,{value:n},e.children)}}}]);