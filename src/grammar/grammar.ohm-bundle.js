'use strict';const ohm=require('ohm-js');const result=ohm.makeRecipe(["grammar",{"source":"Tact {\n\n    // Starting point of the program\n    Program = ProgramItem*\n    ProgramItem = Struct\n                | Contract\n                | Primitive\n                | StaticFunction\n                | NativeFunction\n\n    // Built-in declarations\n    Primitive = primitive Type \";\"\n\n    // Static function\n    StaticFunction = Function\n    NativeFunction = nameAttribute \"(\" id \")\" native id \"(\" ListOf<FunctionArg,\",\"> \")\" \";\" --withVoid\n                   | nameAttribute \"(\" id \")\" native id \"(\" ListOf<FunctionArg,\",\"> \")\" \":\" Type \";\" --withType\n    \n    // Field declarations\n    Type = typeLiteral\n    Field = var id \":\" Type \";\"\n\n    // Struct\n    Struct = struct id \"{\" StructBody* \"}\"\n    StructBody = Field\n\n    // Contract\n    Contract = contract id \"{\" ContractBody* \"}\"\n    ContractBody = Field\n                 | Function \n\n    // Function\n    Function = fun id \"(\" ListOf<FunctionArg,\",\"> \")\" \"{\" Statement* \"}\" --withVoid\n             | fun id \"(\" ListOf<FunctionArg,\",\"> \")\" \":\" Type \"{\" Statement* \"}\" --withType\n             \n    FunctionArg = id \":\" Type\n\n    // Statements\n    Statement = StatementLet\n              | StatementBlock\n              | StatementReturn\n              | StatementCall\n              | StatementStaticCall\n    StatementBlock = \"{\" Statement* \"}\"\n    StatementLet = let id \":\" Type \"=\" Expression \";\"\n    StatementReturn = return Expression \";\"\n    StatementCall = ExpressionCall \";\"\n    StatementStaticCall = ExpressionStaticCall \";\"\n\n    // Expressions\n    Expression = ExpressionOr\n    ExpressionOr = ExpressionOr \"||\" ExpressionAnd --or\n                 | ExpressionAnd\n    ExpressionAnd = ExpressionAnd \"&&\" ExpressionCompare --and\n                  | ExpressionCompare\n    ExpressionCompare = ExpressionCompare \"!=\" ExpressionAdd --not\n                      | ExpressionCompare \"==\" ExpressionAdd --eq\n                      | ExpressionCompare \">\" ExpressionAdd --gt\n                      | ExpressionCompare \">=\" ExpressionAdd --gte\n                      | ExpressionCompare \"<\" ExpressionAdd --lt\n                      | ExpressionCompare \"<=\" ExpressionAdd --lte\n                      | ExpressionAdd\n    ExpressionAdd = ExpressionAdd \"+\" ExpressionMul --add\n                  | ExpressionAdd \"-\" ExpressionMul --sub\n                  | ExpressionMul\n    ExpressionMul = ExpressionMul \"*\" ExpressionUnary --mul\n                  | ExpressionMul \"/\" ExpressionUnary --div\n                  | ExpressionUnary\n    ExpressionUnary = \"-\" ExpressionUnary --neg\n                    | \"+\" ExpressionUnary --add\n                    | \"!\" ExpressionUnary --not\n                    | ExpressionValue\n    ExpressionBracket = \"(\" Expression \")\"\n\n    // Order is important\n    ExpressionValue = ExpressionCall\n                    | ExpressionField\n                    | ExpressionStaticCall\n                    | ExpressionBracket\n                    | integerLiteral\n                    | boolLiteral\n                    | id\n                    \n    ExpressionField = ExpressionValue \".\" id\n    ExpressionCall = ExpressionValue \".\" id \"(\" ListOf<Expression, \",\"> \")\"\n    ExpressionStaticCall = ExpressionValue \"(\" ListOf<Expression, \",\"> \")\"\n\n    // Type Literal\n    typeLiteral = letterAsciiUC typeLiteralPart*\n    typeLiteralPart = letterAscii | digit | \"_\"\n\n    // Integer Literal\n    // hexDigit defined in Ohm's built-in rules (otherwise: hexDigit = \"0\"..\"9\" | \"a\"..\"f\" | \"A\"..\"F\")\n    // digit defined in Ohm's built-in rules (otherwise: digit = \"0\"..\"9\")\n    integerLiteral = integerLiteralHex | integerLiteralDec // Order is important\n    integerLiteralDec = digit+\n    integerLiteralHex = \"0x\" hexDigit+\n                      | \"0X\" hexDigit+\n\n    // Letters\n    letterAsciiLC = \"a\"..\"z\"\n    letterAsciiUC = \"A\"..\"Z\"\n    letterAscii = letterAsciiLC | letterAsciiUC\n\n    // ID Literal\n    idStart = letterAscii | \"_\"\n    idPart = letterAscii | digit | \"_\"\n    id = ~reservedWord idStart idPart*\n\n    // Bool Literal\n    boolLiteral = (\"true\" | \"false\") ~idPart\n\n    // Keywords\n    keyword = struct | contract | var | fun | let | return | primitive | extend | native // Order is important\n    struct = \"struct\" ~idPart\n    contract = \"contract\" ~idPart\n    var = \"var\" ~idPart\n    let = \"let\" ~idPart\n    fun = \"fun\" ~idPart\n    return = \"return\" ~idPart\n    primitive = \"primitive\" ~idPart\n    extend = \"extend\" ~idPart\n    native = \"native\" ~idPart\n\n    // Attributes\n    nameAttribute = \"@name\"\n\n    // Reserved\n    reservedWord = keyword\n}"},"Tact",null,"Program",{"Program":["define",{"sourceInterval":[49,71]},null,[],["star",{"sourceInterval":[59,71]},["app",{"sourceInterval":[59,70]},"ProgramItem",[]]]],"ProgramItem":["define",{"sourceInterval":[76,217]},null,[],["alt",{"sourceInterval":[90,217]},["app",{"sourceInterval":[90,96]},"Struct",[]],["app",{"sourceInterval":[115,123]},"Contract",[]],["app",{"sourceInterval":[142,151]},"Primitive",[]],["app",{"sourceInterval":[170,184]},"StaticFunction",[]],["app",{"sourceInterval":[203,217]},"NativeFunction",[]]]],"Primitive":["define",{"sourceInterval":[252,282]},null,[],["seq",{"sourceInterval":[264,282]},["app",{"sourceInterval":[264,273]},"primitive",[]],["app",{"sourceInterval":[274,278]},"Type",[]],["terminal",{"sourceInterval":[279,282]},";"]]],"StaticFunction":["define",{"sourceInterval":[311,336]},null,[],["app",{"sourceInterval":[328,336]},"Function",[]]],"NativeFunction_withVoid":["define",{"sourceInterval":[358,439]},null,[],["seq",{"sourceInterval":[358,428]},["app",{"sourceInterval":[358,371]},"nameAttribute",[]],["terminal",{"sourceInterval":[372,375]},"("],["app",{"sourceInterval":[376,378]},"id",[]],["terminal",{"sourceInterval":[379,382]},")"],["app",{"sourceInterval":[383,389]},"native",[]],["app",{"sourceInterval":[390,392]},"id",[]],["terminal",{"sourceInterval":[393,396]},"("],["app",{"sourceInterval":[397,420]},"ListOf",[["app",{"sourceInterval":[404,415]},"FunctionArg",[]],["terminal",{"sourceInterval":[416,419]},","]]],["terminal",{"sourceInterval":[421,424]},")"],["terminal",{"sourceInterval":[425,428]},";"]]],"NativeFunction_withType":["define",{"sourceInterval":[461,551]},null,[],["seq",{"sourceInterval":[461,540]},["app",{"sourceInterval":[461,474]},"nameAttribute",[]],["terminal",{"sourceInterval":[475,478]},"("],["app",{"sourceInterval":[479,481]},"id",[]],["terminal",{"sourceInterval":[482,485]},")"],["app",{"sourceInterval":[486,492]},"native",[]],["app",{"sourceInterval":[493,495]},"id",[]],["terminal",{"sourceInterval":[496,499]},"("],["app",{"sourceInterval":[500,523]},"ListOf",[["app",{"sourceInterval":[507,518]},"FunctionArg",[]],["terminal",{"sourceInterval":[519,522]},","]]],["terminal",{"sourceInterval":[524,527]},")"],["terminal",{"sourceInterval":[528,531]},":"],["app",{"sourceInterval":[532,536]},"Type",[]],["terminal",{"sourceInterval":[537,540]},";"]]],"NativeFunction":["define",{"sourceInterval":[341,551]},null,[],["alt",{"sourceInterval":[358,551]},["app",{"sourceInterval":[358,428]},"NativeFunction_withVoid",[]],["app",{"sourceInterval":[461,540]},"NativeFunction_withType",[]]]],"Type":["define",{"sourceInterval":[587,605]},null,[],["app",{"sourceInterval":[594,605]},"typeLiteral",[]]],"Field":["define",{"sourceInterval":[610,637]},null,[],["seq",{"sourceInterval":[618,637]},["app",{"sourceInterval":[618,621]},"var",[]],["app",{"sourceInterval":[622,624]},"id",[]],["terminal",{"sourceInterval":[625,628]},":"],["app",{"sourceInterval":[629,633]},"Type",[]],["terminal",{"sourceInterval":[634,637]},";"]]],"Struct":["define",{"sourceInterval":[657,695]},null,[],["seq",{"sourceInterval":[666,695]},["app",{"sourceInterval":[666,672]},"struct",[]],["app",{"sourceInterval":[673,675]},"id",[]],["terminal",{"sourceInterval":[676,679]},"{"],["star",{"sourceInterval":[680,691]},["app",{"sourceInterval":[680,690]},"StructBody",[]]],["terminal",{"sourceInterval":[692,695]},"}"]]],"StructBody":["define",{"sourceInterval":[700,718]},null,[],["app",{"sourceInterval":[713,718]},"Field",[]]],"Contract":["define",{"sourceInterval":[740,784]},null,[],["seq",{"sourceInterval":[751,784]},["app",{"sourceInterval":[751,759]},"contract",[]],["app",{"sourceInterval":[760,762]},"id",[]],["terminal",{"sourceInterval":[763,766]},"{"],["star",{"sourceInterval":[767,780]},["app",{"sourceInterval":[767,779]},"ContractBody",[]]],["terminal",{"sourceInterval":[781,784]},"}"]]],"ContractBody":["define",{"sourceInterval":[789,837]},null,[],["alt",{"sourceInterval":[804,837]},["app",{"sourceInterval":[804,809]},"Field",[]],["app",{"sourceInterval":[829,837]},"Function",[]]]],"Function_withVoid":["define",{"sourceInterval":[871,939]},null,[],["seq",{"sourceInterval":[871,928]},["app",{"sourceInterval":[871,874]},"fun",[]],["app",{"sourceInterval":[875,877]},"id",[]],["terminal",{"sourceInterval":[878,881]},"("],["app",{"sourceInterval":[882,905]},"ListOf",[["app",{"sourceInterval":[889,900]},"FunctionArg",[]],["terminal",{"sourceInterval":[901,904]},","]]],["terminal",{"sourceInterval":[906,909]},")"],["terminal",{"sourceInterval":[910,913]},"{"],["star",{"sourceInterval":[914,924]},["app",{"sourceInterval":[914,923]},"Statement",[]]],["terminal",{"sourceInterval":[925,928]},"}"]]],"Function_withType":["define",{"sourceInterval":[955,1032]},null,[],["seq",{"sourceInterval":[955,1021]},["app",{"sourceInterval":[955,958]},"fun",[]],["app",{"sourceInterval":[959,961]},"id",[]],["terminal",{"sourceInterval":[962,965]},"("],["app",{"sourceInterval":[966,989]},"ListOf",[["app",{"sourceInterval":[973,984]},"FunctionArg",[]],["terminal",{"sourceInterval":[985,988]},","]]],["terminal",{"sourceInterval":[990,993]},")"],["terminal",{"sourceInterval":[994,997]},":"],["app",{"sourceInterval":[998,1002]},"Type",[]],["terminal",{"sourceInterval":[1003,1006]},"{"],["star",{"sourceInterval":[1007,1017]},["app",{"sourceInterval":[1007,1016]},"Statement",[]]],["terminal",{"sourceInterval":[1018,1021]},"}"]]],"Function":["define",{"sourceInterval":[860,1032]},null,[],["alt",{"sourceInterval":[871,1032]},["app",{"sourceInterval":[871,928]},"Function_withVoid",[]],["app",{"sourceInterval":[955,1021]},"Function_withType",[]]]],"FunctionArg":["define",{"sourceInterval":[1051,1076]},null,[],["seq",{"sourceInterval":[1065,1076]},["app",{"sourceInterval":[1065,1067]},"id",[]],["terminal",{"sourceInterval":[1068,1071]},":"],["app",{"sourceInterval":[1072,1076]},"Type",[]]]],"Statement":["define",{"sourceInterval":[1100,1253]},null,[],["alt",{"sourceInterval":[1112,1253]},["app",{"sourceInterval":[1112,1124]},"StatementLet",[]],["app",{"sourceInterval":[1141,1155]},"StatementBlock",[]],["app",{"sourceInterval":[1172,1187]},"StatementReturn",[]],["app",{"sourceInterval":[1204,1217]},"StatementCall",[]],["app",{"sourceInterval":[1234,1253]},"StatementStaticCall",[]]]],"StatementBlock":["define",{"sourceInterval":[1258,1293]},null,[],["seq",{"sourceInterval":[1275,1293]},["terminal",{"sourceInterval":[1275,1278]},"{"],["star",{"sourceInterval":[1279,1289]},["app",{"sourceInterval":[1279,1288]},"Statement",[]]],["terminal",{"sourceInterval":[1290,1293]},"}"]]],"StatementLet":["define",{"sourceInterval":[1298,1347]},null,[],["seq",{"sourceInterval":[1313,1347]},["app",{"sourceInterval":[1313,1316]},"let",[]],["app",{"sourceInterval":[1317,1319]},"id",[]],["terminal",{"sourceInterval":[1320,1323]},":"],["app",{"sourceInterval":[1324,1328]},"Type",[]],["terminal",{"sourceInterval":[1329,1332]},"="],["app",{"sourceInterval":[1333,1343]},"Expression",[]],["terminal",{"sourceInterval":[1344,1347]},";"]]],"StatementReturn":["define",{"sourceInterval":[1352,1391]},null,[],["seq",{"sourceInterval":[1370,1391]},["app",{"sourceInterval":[1370,1376]},"return",[]],["app",{"sourceInterval":[1377,1387]},"Expression",[]],["terminal",{"sourceInterval":[1388,1391]},";"]]],"StatementCall":["define",{"sourceInterval":[1396,1430]},null,[],["seq",{"sourceInterval":[1412,1430]},["app",{"sourceInterval":[1412,1426]},"ExpressionCall",[]],["terminal",{"sourceInterval":[1427,1430]},";"]]],"StatementStaticCall":["define",{"sourceInterval":[1435,1481]},null,[],["seq",{"sourceInterval":[1457,1481]},["app",{"sourceInterval":[1457,1477]},"ExpressionStaticCall",[]],["terminal",{"sourceInterval":[1478,1481]},";"]]],"Expression":["define",{"sourceInterval":[1506,1531]},null,[],["app",{"sourceInterval":[1519,1531]},"ExpressionOr",[]]],"ExpressionOr_or":["define",{"sourceInterval":[1551,1587]},null,[],["seq",{"sourceInterval":[1551,1582]},["app",{"sourceInterval":[1551,1563]},"ExpressionOr",[]],["terminal",{"sourceInterval":[1564,1568]},"||"],["app",{"sourceInterval":[1569,1582]},"ExpressionAnd",[]]]],"ExpressionOr":["define",{"sourceInterval":[1536,1620]},null,[],["alt",{"sourceInterval":[1551,1620]},["app",{"sourceInterval":[1551,1582]},"ExpressionOr_or",[]],["app",{"sourceInterval":[1607,1620]},"ExpressionAnd",[]]]],"ExpressionAnd_and":["define",{"sourceInterval":[1641,1683]},null,[],["seq",{"sourceInterval":[1641,1677]},["app",{"sourceInterval":[1641,1654]},"ExpressionAnd",[]],["terminal",{"sourceInterval":[1655,1659]},"&&"],["app",{"sourceInterval":[1660,1677]},"ExpressionCompare",[]]]],"ExpressionAnd":["define",{"sourceInterval":[1625,1721]},null,[],["alt",{"sourceInterval":[1641,1721]},["app",{"sourceInterval":[1641,1677]},"ExpressionAnd_and",[]],["app",{"sourceInterval":[1704,1721]},"ExpressionCompare",[]]]],"ExpressionCompare_not":["define",{"sourceInterval":[1746,1788]},null,[],["seq",{"sourceInterval":[1746,1782]},["app",{"sourceInterval":[1746,1763]},"ExpressionCompare",[]],["terminal",{"sourceInterval":[1764,1768]},"!="],["app",{"sourceInterval":[1769,1782]},"ExpressionAdd",[]]]],"ExpressionCompare_eq":["define",{"sourceInterval":[1813,1854]},null,[],["seq",{"sourceInterval":[1813,1849]},["app",{"sourceInterval":[1813,1830]},"ExpressionCompare",[]],["terminal",{"sourceInterval":[1831,1835]},"=="],["app",{"sourceInterval":[1836,1849]},"ExpressionAdd",[]]]],"ExpressionCompare_gt":["define",{"sourceInterval":[1879,1919]},null,[],["seq",{"sourceInterval":[1879,1914]},["app",{"sourceInterval":[1879,1896]},"ExpressionCompare",[]],["terminal",{"sourceInterval":[1897,1900]},">"],["app",{"sourceInterval":[1901,1914]},"ExpressionAdd",[]]]],"ExpressionCompare_gte":["define",{"sourceInterval":[1944,1986]},null,[],["seq",{"sourceInterval":[1944,1980]},["app",{"sourceInterval":[1944,1961]},"ExpressionCompare",[]],["terminal",{"sourceInterval":[1962,1966]},">="],["app",{"sourceInterval":[1967,1980]},"ExpressionAdd",[]]]],"ExpressionCompare_lt":["define",{"sourceInterval":[2011,2051]},null,[],["seq",{"sourceInterval":[2011,2046]},["app",{"sourceInterval":[2011,2028]},"ExpressionCompare",[]],["terminal",{"sourceInterval":[2029,2032]},"<"],["app",{"sourceInterval":[2033,2046]},"ExpressionAdd",[]]]],"ExpressionCompare_lte":["define",{"sourceInterval":[2076,2118]},null,[],["seq",{"sourceInterval":[2076,2112]},["app",{"sourceInterval":[2076,2093]},"ExpressionCompare",[]],["terminal",{"sourceInterval":[2094,2098]},"<="],["app",{"sourceInterval":[2099,2112]},"ExpressionAdd",[]]]],"ExpressionCompare":["define",{"sourceInterval":[1726,2156]},null,[],["alt",{"sourceInterval":[1746,2156]},["app",{"sourceInterval":[1746,1782]},"ExpressionCompare_not",[]],["app",{"sourceInterval":[1813,1849]},"ExpressionCompare_eq",[]],["app",{"sourceInterval":[1879,1914]},"ExpressionCompare_gt",[]],["app",{"sourceInterval":[1944,1980]},"ExpressionCompare_gte",[]],["app",{"sourceInterval":[2011,2046]},"ExpressionCompare_lt",[]],["app",{"sourceInterval":[2076,2112]},"ExpressionCompare_lte",[]],["app",{"sourceInterval":[2143,2156]},"ExpressionAdd",[]]]],"ExpressionAdd_add":["define",{"sourceInterval":[2177,2214]},null,[],["seq",{"sourceInterval":[2177,2208]},["app",{"sourceInterval":[2177,2190]},"ExpressionAdd",[]],["terminal",{"sourceInterval":[2191,2194]},"+"],["app",{"sourceInterval":[2195,2208]},"ExpressionMul",[]]]],"ExpressionAdd_sub":["define",{"sourceInterval":[2235,2272]},null,[],["seq",{"sourceInterval":[2235,2266]},["app",{"sourceInterval":[2235,2248]},"ExpressionAdd",[]],["terminal",{"sourceInterval":[2249,2252]},"-"],["app",{"sourceInterval":[2253,2266]},"ExpressionMul",[]]]],"ExpressionAdd":["define",{"sourceInterval":[2161,2306]},null,[],["alt",{"sourceInterval":[2177,2306]},["app",{"sourceInterval":[2177,2208]},"ExpressionAdd_add",[]],["app",{"sourceInterval":[2235,2266]},"ExpressionAdd_sub",[]],["app",{"sourceInterval":[2293,2306]},"ExpressionMul",[]]]],"ExpressionMul_mul":["define",{"sourceInterval":[2327,2366]},null,[],["seq",{"sourceInterval":[2327,2360]},["app",{"sourceInterval":[2327,2340]},"ExpressionMul",[]],["terminal",{"sourceInterval":[2341,2344]},"*"],["app",{"sourceInterval":[2345,2360]},"ExpressionUnary",[]]]],"ExpressionMul_div":["define",{"sourceInterval":[2387,2426]},null,[],["seq",{"sourceInterval":[2387,2420]},["app",{"sourceInterval":[2387,2400]},"ExpressionMul",[]],["terminal",{"sourceInterval":[2401,2404]},"/"],["app",{"sourceInterval":[2405,2420]},"ExpressionUnary",[]]]],"ExpressionMul":["define",{"sourceInterval":[2311,2462]},null,[],["alt",{"sourceInterval":[2327,2462]},["app",{"sourceInterval":[2327,2360]},"ExpressionMul_mul",[]],["app",{"sourceInterval":[2387,2420]},"ExpressionMul_div",[]],["app",{"sourceInterval":[2447,2462]},"ExpressionUnary",[]]]],"ExpressionUnary_neg":["define",{"sourceInterval":[2485,2510]},null,[],["seq",{"sourceInterval":[2485,2504]},["terminal",{"sourceInterval":[2485,2488]},"-"],["app",{"sourceInterval":[2489,2504]},"ExpressionUnary",[]]]],"ExpressionUnary_add":["define",{"sourceInterval":[2533,2558]},null,[],["seq",{"sourceInterval":[2533,2552]},["terminal",{"sourceInterval":[2533,2536]},"+"],["app",{"sourceInterval":[2537,2552]},"ExpressionUnary",[]]]],"ExpressionUnary_not":["define",{"sourceInterval":[2581,2606]},null,[],["seq",{"sourceInterval":[2581,2600]},["terminal",{"sourceInterval":[2581,2584]},"!"],["app",{"sourceInterval":[2585,2600]},"ExpressionUnary",[]]]],"ExpressionUnary":["define",{"sourceInterval":[2467,2644]},null,[],["alt",{"sourceInterval":[2485,2644]},["app",{"sourceInterval":[2485,2504]},"ExpressionUnary_neg",[]],["app",{"sourceInterval":[2533,2552]},"ExpressionUnary_add",[]],["app",{"sourceInterval":[2581,2600]},"ExpressionUnary_not",[]],["app",{"sourceInterval":[2629,2644]},"ExpressionValue",[]]]],"ExpressionBracket":["define",{"sourceInterval":[2649,2687]},null,[],["seq",{"sourceInterval":[2669,2687]},["terminal",{"sourceInterval":[2669,2672]},"("],["app",{"sourceInterval":[2673,2683]},"Expression",[]],["terminal",{"sourceInterval":[2684,2687]},")"]]],"ExpressionValue":["define",{"sourceInterval":[2719,2968]},null,[],["alt",{"sourceInterval":[2737,2968]},["app",{"sourceInterval":[2737,2751]},"ExpressionCall",[]],["app",{"sourceInterval":[2774,2789]},"ExpressionField",[]],["app",{"sourceInterval":[2812,2832]},"ExpressionStaticCall",[]],["app",{"sourceInterval":[2855,2872]},"ExpressionBracket",[]],["app",{"sourceInterval":[2895,2909]},"integerLiteral",[]],["app",{"sourceInterval":[2932,2943]},"boolLiteral",[]],["app",{"sourceInterval":[2966,2968]},"id",[]]]],"ExpressionField":["define",{"sourceInterval":[2994,3034]},null,[],["seq",{"sourceInterval":[3012,3034]},["app",{"sourceInterval":[3012,3027]},"ExpressionValue",[]],["terminal",{"sourceInterval":[3028,3031]},"."],["app",{"sourceInterval":[3032,3034]},"id",[]]]],"ExpressionCall":["define",{"sourceInterval":[3039,3110]},null,[],["seq",{"sourceInterval":[3056,3110]},["app",{"sourceInterval":[3056,3071]},"ExpressionValue",[]],["terminal",{"sourceInterval":[3072,3075]},"."],["app",{"sourceInterval":[3076,3078]},"id",[]],["terminal",{"sourceInterval":[3079,3082]},"("],["app",{"sourceInterval":[3083,3106]},"ListOf",[["app",{"sourceInterval":[3090,3100]},"Expression",[]],["terminal",{"sourceInterval":[3102,3105]},","]]],["terminal",{"sourceInterval":[3107,3110]},")"]]],"ExpressionStaticCall":["define",{"sourceInterval":[3115,3185]},null,[],["seq",{"sourceInterval":[3138,3185]},["app",{"sourceInterval":[3138,3153]},"ExpressionValue",[]],["terminal",{"sourceInterval":[3154,3157]},"("],["app",{"sourceInterval":[3158,3181]},"ListOf",[["app",{"sourceInterval":[3165,3175]},"Expression",[]],["terminal",{"sourceInterval":[3177,3180]},","]]],["terminal",{"sourceInterval":[3182,3185]},")"]]],"typeLiteral":["define",{"sourceInterval":[3211,3255]},null,[],["seq",{"sourceInterval":[3225,3255]},["app",{"sourceInterval":[3225,3238]},"letterAsciiUC",[]],["star",{"sourceInterval":[3239,3255]},["app",{"sourceInterval":[3239,3254]},"typeLiteralPart",[]]]]],"typeLiteralPart":["define",{"sourceInterval":[3260,3303]},null,[],["alt",{"sourceInterval":[3278,3303]},["app",{"sourceInterval":[3278,3289]},"letterAscii",[]],["app",{"sourceInterval":[3292,3297]},"digit",[]],["terminal",{"sourceInterval":[3300,3303]},"_"]]],"integerLiteral":["define",{"sourceInterval":[3510,3564]},null,[],["alt",{"sourceInterval":[3527,3564]},["app",{"sourceInterval":[3527,3544]},"integerLiteralHex",[]],["app",{"sourceInterval":[3547,3564]},"integerLiteralDec",[]]]],"integerLiteralDec":["define",{"sourceInterval":[3591,3617]},null,[],["plus",{"sourceInterval":[3611,3617]},["app",{"sourceInterval":[3611,3616]},"digit",[]]]],"integerLiteralHex":["define",{"sourceInterval":[3622,3695]},null,[],["alt",{"sourceInterval":[3642,3695]},["seq",{"sourceInterval":[3642,3656]},["terminal",{"sourceInterval":[3642,3646]},"0x"],["plus",{"sourceInterval":[3647,3656]},["app",{"sourceInterval":[3647,3655]},"hexDigit",[]]]],["seq",{"sourceInterval":[3681,3695]},["terminal",{"sourceInterval":[3681,3685]},"0X"],["plus",{"sourceInterval":[3686,3695]},["app",{"sourceInterval":[3686,3694]},"hexDigit",[]]]]]],"letterAsciiLC":["define",{"sourceInterval":[3716,3740]},null,[],["range",{"sourceInterval":[3732,3740]},"a","z"]],"letterAsciiUC":["define",{"sourceInterval":[3745,3769]},null,[],["range",{"sourceInterval":[3761,3769]},"A","Z"]],"letterAscii":["define",{"sourceInterval":[3774,3817]},null,[],["alt",{"sourceInterval":[3788,3817]},["app",{"sourceInterval":[3788,3801]},"letterAsciiLC",[]],["app",{"sourceInterval":[3804,3817]},"letterAsciiUC",[]]]],"idStart":["define",{"sourceInterval":[3841,3868]},null,[],["alt",{"sourceInterval":[3851,3868]},["app",{"sourceInterval":[3851,3862]},"letterAscii",[]],["terminal",{"sourceInterval":[3865,3868]},"_"]]],"idPart":["define",{"sourceInterval":[3873,3907]},null,[],["alt",{"sourceInterval":[3882,3907]},["app",{"sourceInterval":[3882,3893]},"letterAscii",[]],["app",{"sourceInterval":[3896,3901]},"digit",[]],["terminal",{"sourceInterval":[3904,3907]},"_"]]],"id":["define",{"sourceInterval":[3912,3946]},null,[],["seq",{"sourceInterval":[3917,3946]},["not",{"sourceInterval":[3917,3930]},["app",{"sourceInterval":[3918,3930]},"reservedWord",[]]],["app",{"sourceInterval":[3931,3938]},"idStart",[]],["star",{"sourceInterval":[3939,3946]},["app",{"sourceInterval":[3939,3945]},"idPart",[]]]]],"boolLiteral":["define",{"sourceInterval":[3972,4012]},null,[],["seq",{"sourceInterval":[3986,4012]},["alt",{"sourceInterval":[3987,4003]},["terminal",{"sourceInterval":[3987,3993]},"true"],["terminal",{"sourceInterval":[3996,4003]},"false"]],["not",{"sourceInterval":[4005,4012]},["app",{"sourceInterval":[4006,4012]},"idPart",[]]]]],"keyword":["define",{"sourceInterval":[4034,4118]},null,[],["alt",{"sourceInterval":[4044,4118]},["app",{"sourceInterval":[4044,4050]},"struct",[]],["app",{"sourceInterval":[4053,4061]},"contract",[]],["app",{"sourceInterval":[4064,4067]},"var",[]],["app",{"sourceInterval":[4070,4073]},"fun",[]],["app",{"sourceInterval":[4076,4079]},"let",[]],["app",{"sourceInterval":[4082,4088]},"return",[]],["app",{"sourceInterval":[4091,4100]},"primitive",[]],["app",{"sourceInterval":[4103,4109]},"extend",[]],["app",{"sourceInterval":[4112,4118]},"native",[]]]],"struct":["define",{"sourceInterval":[4145,4170]},null,[],["seq",{"sourceInterval":[4154,4170]},["terminal",{"sourceInterval":[4154,4162]},"struct"],["not",{"sourceInterval":[4163,4170]},["app",{"sourceInterval":[4164,4170]},"idPart",[]]]]],"contract":["define",{"sourceInterval":[4175,4204]},null,[],["seq",{"sourceInterval":[4186,4204]},["terminal",{"sourceInterval":[4186,4196]},"contract"],["not",{"sourceInterval":[4197,4204]},["app",{"sourceInterval":[4198,4204]},"idPart",[]]]]],"var":["define",{"sourceInterval":[4209,4228]},null,[],["seq",{"sourceInterval":[4215,4228]},["terminal",{"sourceInterval":[4215,4220]},"var"],["not",{"sourceInterval":[4221,4228]},["app",{"sourceInterval":[4222,4228]},"idPart",[]]]]],"let":["define",{"sourceInterval":[4233,4252]},null,[],["seq",{"sourceInterval":[4239,4252]},["terminal",{"sourceInterval":[4239,4244]},"let"],["not",{"sourceInterval":[4245,4252]},["app",{"sourceInterval":[4246,4252]},"idPart",[]]]]],"fun":["define",{"sourceInterval":[4257,4276]},null,[],["seq",{"sourceInterval":[4263,4276]},["terminal",{"sourceInterval":[4263,4268]},"fun"],["not",{"sourceInterval":[4269,4276]},["app",{"sourceInterval":[4270,4276]},"idPart",[]]]]],"return":["define",{"sourceInterval":[4281,4306]},null,[],["seq",{"sourceInterval":[4290,4306]},["terminal",{"sourceInterval":[4290,4298]},"return"],["not",{"sourceInterval":[4299,4306]},["app",{"sourceInterval":[4300,4306]},"idPart",[]]]]],"primitive":["define",{"sourceInterval":[4311,4342]},null,[],["seq",{"sourceInterval":[4323,4342]},["terminal",{"sourceInterval":[4323,4334]},"primitive"],["not",{"sourceInterval":[4335,4342]},["app",{"sourceInterval":[4336,4342]},"idPart",[]]]]],"extend":["define",{"sourceInterval":[4347,4372]},null,[],["seq",{"sourceInterval":[4356,4372]},["terminal",{"sourceInterval":[4356,4364]},"extend"],["not",{"sourceInterval":[4365,4372]},["app",{"sourceInterval":[4366,4372]},"idPart",[]]]]],"native":["define",{"sourceInterval":[4377,4402]},null,[],["seq",{"sourceInterval":[4386,4402]},["terminal",{"sourceInterval":[4386,4394]},"native"],["not",{"sourceInterval":[4395,4402]},["app",{"sourceInterval":[4396,4402]},"idPart",[]]]]],"nameAttribute":["define",{"sourceInterval":[4426,4449]},null,[],["terminal",{"sourceInterval":[4442,4449]},"@name"]],"reservedWord":["define",{"sourceInterval":[4471,4493]},null,[],["app",{"sourceInterval":[4486,4493]},"keyword",[]]]}]);module.exports=result;