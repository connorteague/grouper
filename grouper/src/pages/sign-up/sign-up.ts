import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, Loading, LoadingController,
  AlertController} from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthProvider } from '../../providers/auth/auth';

import { Sim } from '@ionic-native/sim';

import { UserInfoProvider } from '../../providers/user-info/user-info';


export const countryCodes = {"BD": {"countryName": "Bangladesh", "phoneCode": "880"}, "BE": {"countryName": "Belgium", "phoneCode": "32"}, "BF": {"countryName": "Burkina Faso", "phoneCode": "226"}, "BG": {"countryName": "Bulgaria", "phoneCode": "359"}, "BA": {"countryName": "Bosnia and Herzegovina", "phoneCode": "387"}, "BB": {"countryName": "Barbados", "phoneCode": "+1-246"}, "WF": {"countryName": "Wallis and Futuna", "phoneCode": "681"}, "BL": {"countryName": "Saint Barthelemy", "phoneCode": "590"}, "BM": {"countryName": "Bermuda", "phoneCode": "+1-441"}, "BN": {"countryName": "Brunei", "phoneCode": "673"}, "BO": {"countryName": "Bolivia", "phoneCode": "591"}, "BH": {"countryName": "Bahrain", "phoneCode": "973"}, "BI": {"countryName": "Burundi", "phoneCode": "257"}, "BJ": {"countryName": "Benin", "phoneCode": "229"}, "BT": {"countryName": "Bhutan", "phoneCode": "975"}, "JM": {"countryName": "Jamaica", "phoneCode": "+1-876"}, "BV": {"countryName": "Bouvet Island", "phoneCode": ""}, "BW": {"countryName": "Botswana", "phoneCode": "267"}, "WS": {"countryName": "Samoa", "phoneCode": "685"}, "BQ": {"countryName": "Bonaire, Saint Eustatius and Saba ", "phoneCode": "599"}, "BR": {"countryName": "Brazil", "phoneCode": "55"}, "BS": {"countryName": "Bahamas", "phoneCode": "+1-242"}, "JE": {"countryName": "Jersey", "phoneCode": "+44-1534"}, "BY": {"countryName": "Belarus", "phoneCode": "375"}, "BZ": {"countryName": "Belize", "phoneCode": "501"}, "RU": {"countryName": "Russia", "phoneCode": "7"}, "RW": {"countryName": "Rwanda", "phoneCode": "250"}, "RS": {"countryName": "Serbia", "phoneCode": "381"}, "TL": {"countryName": "East Timor", "phoneCode": "670"}, "RE": {"countryName": "Reunion", "phoneCode": "262"}, "TM": {"countryName": "Turkmenistan", "phoneCode": "993"}, "TJ": {"countryName": "Tajikistan", "phoneCode": "992"}, "RO": {"countryName": "Romania", "phoneCode": "40"}, "TK": {"countryName": "Tokelau", "phoneCode": "690"}, "GW": {"countryName": "Guinea-Bissau", "phoneCode": "245"}, "GU": {"countryName": "Guam", "phoneCode": "+1-671"}, "GT": {"countryName": "Guatemala", "phoneCode": "502"}, "GS": {"countryName": "South Georgia and the South Sandwich Islands", "phoneCode": ""}, "GR": {"countryName": "Greece", "phoneCode": "30"}, "GQ": {"countryName": "Equatorial Guinea", "phoneCode": "240"}, "GP": {"countryName": "Guadeloupe", "phoneCode": "590"}, "JP": {"countryName": "Japan", "phoneCode": "81"}, "GY": {"countryName": "Guyana", "phoneCode": "592"}, "GG": {"countryName": "Guernsey", "phoneCode": "+44-1481"}, "GF": {"countryName": "French Guiana", "phoneCode": "594"}, "GE": {"countryName": "Georgia", "phoneCode": "995"}, "GD": {"countryName": "Grenada", "phoneCode": "+1-473"}, "GB": {"countryName": "United Kingdom", "phoneCode": "44"}, "GA": {"countryName": "Gabon", "phoneCode": "241"}, "SV": {"countryName": "El Salvador", "phoneCode": "503"}, "GN": {"countryName": "Guinea", "phoneCode": "224"}, "GM": {"countryName": "Gambia", "phoneCode": "220"}, "GL": {"countryName": "Greenland", "phoneCode": "299"}, "GI": {"countryName": "Gibraltar", "phoneCode": "350"}, "GH": {"countryName": "Ghana", "phoneCode": "233"}, "OM": {"countryName": "Oman", "phoneCode": "968"}, "TN": {"countryName": "Tunisia", "phoneCode": "216"}, "IL": {"countryName": "Israel", "phoneCode": "972"}, "JO": {"countryName": "Jordan", "phoneCode": "962"}, "HR": {"countryName": "Croatia", "phoneCode": "385"}, "HT": {"countryName": "Haiti", "phoneCode": "509"}, "HU": {"countryName": "Hungary", "phoneCode": "36"}, "HK": {"countryName": "Hong Kong", "phoneCode": "852"}, "HN": {"countryName": "Honduras", "phoneCode": "504"}, "HM": {"countryName": "Heard Island and McDonald Islands", "phoneCode": " "}, "VE": {"countryName": "Venezuela", "phoneCode": "58"}, "PR": {"countryName": "Puerto Rico", "phoneCode": "+1-787 and 1-939"}, "PS": {"countryName": "Palestinian Territory", "phoneCode": "970"}, "PW": {"countryName": "Palau", "phoneCode": "680"}, "PT": {"countryName": "Portugal", "phoneCode": "351"}, "SJ": {"countryName": "Svalbard and Jan Mayen", "phoneCode": "47"}, "PY": {"countryName": "Paraguay", "phoneCode": "595"}, "IQ": {"countryName": "Iraq", "phoneCode": "964"}, "PA": {"countryName": "Panama", "phoneCode": "507"}, "PF": {"countryName": "French Polynesia", "phoneCode": "689"}, "PG": {"countryName": "Papua New Guinea", "phoneCode": "675"}, "PE": {"countryName": "Peru", "phoneCode": "51"}, "PK": {"countryName": "Pakistan", "phoneCode": "92"}, "PH": {"countryName": "Philippines", "phoneCode": "63"}, "PN": {"countryName": "Pitcairn", "phoneCode": "870"}, "PL": {"countryName": "Poland", "phoneCode": "48"}, "PM": {"countryName": "Saint Pierre and Miquelon", "phoneCode": "508"}, "ZM": {"countryName": "Zambia", "phoneCode": "260"}, "EH": {"countryName": "Western Sahara", "phoneCode": "212"}, "EE": {"countryName": "Estonia", "phoneCode": "372"}, "EG": {"countryName": "Egypt", "phoneCode": "20"}, "ZA": {"countryName": "South Africa", "phoneCode": "27"}, "EC": {"countryName": "Ecuador", "phoneCode": "593"}, "IT": {"countryName": "Italy", "phoneCode": "39"}, "VN": {"countryName": "Vietnam", "phoneCode": "84"}, "SB": {"countryName": "Solomon Islands", "phoneCode": "677"}, "ET": {"countryName": "Ethiopia", "phoneCode": "251"}, "SO": {"countryName": "Somalia", "phoneCode": "252"}, "ZW": {"countryName": "Zimbabwe", "phoneCode": "263"}, "SA": {"countryName": "Saudi Arabia", "phoneCode": "966"}, "ES": {"countryName": "Spain", "phoneCode": "34"}, "ER": {"countryName": "Eritrea", "phoneCode": "291"}, "ME": {"countryName": "Montenegro", "phoneCode": "382"}, "MD": {"countryName": "Moldova", "phoneCode": "373"}, "MG": {"countryName": "Madagascar", "phoneCode": "261"}, "MF": {"countryName": "Saint Martin", "phoneCode": "590"}, "MA": {"countryName": "Morocco", "phoneCode": "212"}, "MC": {"countryName": "Monaco", "phoneCode": "377"}, "UZ": {"countryName": "Uzbekistan", "phoneCode": "998"}, "MM": {"countryName": "Myanmar", "phoneCode": "95"}, "ML": {"countryName": "Mali", "phoneCode": "223"}, "MO": {"countryName": "Macao", "phoneCode": "853"}, "MN": {"countryName": "Mongolia", "phoneCode": "976"}, "MH": {"countryName": "Marshall Islands", "phoneCode": "692"}, "MK": {"countryName": "Macedonia", "phoneCode": "389"}, "MU": {"countryName": "Mauritius", "phoneCode": "230"}, "MT": {"countryName": "Malta", "phoneCode": "356"}, "MW": {"countryName": "Malawi", "phoneCode": "265"}, "MV": {"countryName": "Maldives", "phoneCode": "960"}, "MQ": {"countryName": "Martinique", "phoneCode": "596"}, "MP": {"countryName": "Northern Mariana Islands", "phoneCode": "+1-670"}, "MS": {"countryName": "Montserrat", "phoneCode": "+1-664"}, "MR": {"countryName": "Mauritania", "phoneCode": "222"}, "IM": {"countryName": "Isle of Man", "phoneCode": "+44-1624"}, "UG": {"countryName": "Uganda", "phoneCode": "256"}, "MY": {"countryName": "Malaysia", "phoneCode": "60"}, "MX": {"countryName": "Mexico", "phoneCode": "52"}, "AT": {"countryName": "Austria", "phoneCode": "43"}, "FR": {"countryName": "France", "phoneCode": "33"}, "IO": {"countryName": "British Indian Ocean Territory", "phoneCode": "246"}, "SH": {"countryName": "Saint Helena", "phoneCode": "290"}, "FI": {"countryName": "Finland", "phoneCode": "358"}, "FJ": {"countryName": "Fiji", "phoneCode": "679"}, "FK": {"countryName": "Falkland Islands", "phoneCode": "500"}, "FM": {"countryName": "Micronesia", "phoneCode": "691"}, "FO": {"countryName": "Faroe Islands", "phoneCode": "298"}, "NI": {"countryName": "Nicaragua", "phoneCode": "505"}, "NL": {"countryName": "Netherlands", "phoneCode": "31"}, "NO": {"countryName": "Norway", "phoneCode": "47"}, "NA": {"countryName": "Namibia", "phoneCode": "264"}, "NC": {"countryName": "New Caledonia", "phoneCode": "687"}, "NE": {"countryName": "Niger", "phoneCode": "227"}, "NF": {"countryName": "Norfolk Island", "phoneCode": "672"}, "NG": {"countryName": "Nigeria", "phoneCode": "234"}, "NZ": {"countryName": "New Zealand", "phoneCode": "64"}, "NP": {"countryName": "Nepal", "phoneCode": "977"}, "NR": {"countryName": "Nauru", "phoneCode": "674"}, "NU": {"countryName": "Niue", "phoneCode": "683"}, "CK": {"countryName": "Cook Islands", "phoneCode": "682"}, "XK": {"countryName": "Kosovo", "phoneCode": ""}, "CI": {"countryName": "Ivory Coast", "phoneCode": "225"}, "CH": {"countryName": "Switzerland", "phoneCode": "41"}, "CO": {"countryName": "Colombia", "phoneCode": "57"}, "CN": {"countryName": "China", "phoneCode": "86"}, "CM": {"countryName": "Cameroon", "phoneCode": "237"}, "CL": {"countryName": "Chile", "phoneCode": "56"}, "CC": {"countryName": "Cocos Islands", "phoneCode": "61"}, "CA": {"countryName": "Canada", "phoneCode": "1"}, "LB": {"countryName": "Lebanon", "phoneCode": "961"}, "CG": {"countryName": "Republic of the Congo", "phoneCode": "242"}, "CF": {"countryName": "Central African Republic", "phoneCode": "236"}, "CD": {"countryName": "Democratic Republic of the Congo", "phoneCode": "243"}, "CZ": {"countryName": "Czech Republic", "phoneCode": "420"}, "CY": {"countryName": "Cyprus", "phoneCode": "357"}, "CX": {"countryName": "Christmas Island", "phoneCode": "61"}, "CR": {"countryName": "Costa Rica", "phoneCode": "506"}, "CW": {"countryName": "Curacao", "phoneCode": "599"}, "CV": {"countryName": "Cape Verde", "phoneCode": "238"}, "CU": {"countryName": "Cuba", "phoneCode": "53"}, "SZ": {"countryName": "Swaziland", "phoneCode": "268"}, "SY": {"countryName": "Syria", "phoneCode": "963"}, "SX": {"countryName": "Sint Maarten", "phoneCode": "599"}, "KG": {"countryName": "Kyrgyzstan", "phoneCode": "996"}, "KE": {"countryName": "Kenya", "phoneCode": "254"}, "SS": {"countryName": "South Sudan", "phoneCode": "211"}, "SR": {"countryName": "Suriname", "phoneCode": "597"}, "KI": {"countryName": "Kiribati", "phoneCode": "686"}, "KH": {"countryName": "Cambodia", "phoneCode": "855"}, "KN": {"countryName": "Saint Kitts and Nevis", "phoneCode": "+1-869"}, "KM": {"countryName": "Comoros", "phoneCode": "269"}, "ST": {"countryName": "Sao Tome and Principe", "phoneCode": "239"}, "SK": {"countryName": "Slovakia", "phoneCode": "421"}, "KR": {"countryName": "South Korea", "phoneCode": "82"}, "SI": {"countryName": "Slovenia", "phoneCode": "386"}, "KP": {"countryName": "North Korea", "phoneCode": "850"}, "KW": {"countryName": "Kuwait", "phoneCode": "965"}, "SN": {"countryName": "Senegal", "phoneCode": "221"}, "SM": {"countryName": "San Marino", "phoneCode": "378"}, "SL": {"countryName": "Sierra Leone", "phoneCode": "232"}, "SC": {"countryName": "Seychelles", "phoneCode": "248"}, "KZ": {"countryName": "Kazakhstan", "phoneCode": "7"}, "KY": {"countryName": "Cayman Islands", "phoneCode": "+1-345"}, "SG": {"countryName": "Singapore", "phoneCode": "65"}, "SE": {"countryName": "Sweden", "phoneCode": "46"}, "SD": {"countryName": "Sudan", "phoneCode": "249"}, "DO": {"countryName": "Dominican Republic", "phoneCode": "+1-809 and 1-829"}, "DM": {"countryName": "Dominica", "phoneCode": "+1-767"}, "DJ": {"countryName": "Djibouti", "phoneCode": "253"}, "DK": {"countryName": "Denmark", "phoneCode": "45"}, "VG": {"countryName": "British Virgin Islands", "phoneCode": "+1-284"}, "DE": {"countryName": "Germany", "phoneCode": "49"}, "YE": {"countryName": "Yemen", "phoneCode": "967"}, "DZ": {"countryName": "Algeria", "phoneCode": "213"}, "US": {"countryName": "United States", "phoneCode": "1"}, "UY": {"countryName": "Uruguay", "phoneCode": "598"}, "YT": {"countryName": "Mayotte", "phoneCode": "262"}, "UM": {"countryName": "United States Minor Outlying Islands", "phoneCode": "1"}, "TZ": {"countryName": "Tanzania", "phoneCode": "255"}, "LC": {"countryName": "Saint Lucia", "phoneCode": "+1-758"}, "LA": {"countryName": "Laos", "phoneCode": "856"}, "TV": {"countryName": "Tuvalu", "phoneCode": "688"}, "TW": {"countryName": "Taiwan", "phoneCode": "886"}, "TT": {"countryName": "Trinidad and Tobago", "phoneCode": "+1-868"}, "TR": {"countryName": "Turkey", "phoneCode": "90"}, "LK": {"countryName": "Sri Lanka", "phoneCode": "94"}, "LI": {"countryName": "Liechtenstein", "phoneCode": "423"}, "LV": {"countryName": "Latvia", "phoneCode": "371"}, "TO": {"countryName": "Tonga", "phoneCode": "676"}, "LT": {"countryName": "Lithuania", "phoneCode": "370"}, "LU": {"countryName": "Luxembourg", "phoneCode": "352"}, "LR": {"countryName": "Liberia", "phoneCode": "231"}, "LS": {"countryName": "Lesotho", "phoneCode": "266"}, "TH": {"countryName": "Thailand", "phoneCode": "66"}, "TF": {"countryName": "French Southern Territories", "phoneCode": ""}, "TG": {"countryName": "Togo", "phoneCode": "228"}, "TD": {"countryName": "Chad", "phoneCode": "235"}, "TC": {"countryName": "Turks and Caicos Islands", "phoneCode": "+1-649"}, "LY": {"countryName": "Libya", "phoneCode": "218"}, "VA": {"countryName": "Vatican", "phoneCode": "379"}, "VC": {"countryName": "Saint Vincent and the Grenadines", "phoneCode": "+1-784"}, "AE": {"countryName": "United Arab Emirates", "phoneCode": "971"}, "AD": {"countryName": "Andorra", "phoneCode": "376"}, "AG": {"countryName": "Antigua and Barbuda", "phoneCode": "+1-268"}, "AF": {"countryName": "Afghanistan", "phoneCode": "93"}, "AI": {"countryName": "Anguilla", "phoneCode": "+1-264"}, "VI": {"countryName": "U.S. Virgin Islands", "phoneCode": "+1-340"}, "IS": {"countryName": "Iceland", "phoneCode": "354"}, "IR": {"countryName": "Iran", "phoneCode": "98"}, "AM": {"countryName": "Armenia", "phoneCode": "374"}, "AL": {"countryName": "Albania", "phoneCode": "355"}, "AO": {"countryName": "Angola", "phoneCode": "244"}, "AQ": {"countryName": "Antarctica", "phoneCode": ""}, "AS": {"countryName": "American Samoa", "phoneCode": "+1-684"}, "AR": {"countryName": "Argentina", "phoneCode": "54"}, "AU": {"countryName": "Australia", "phoneCode": "61"}, "VU": {"countryName": "Vanuatu", "phoneCode": "678"}, "AW": {"countryName": "Aruba", "phoneCode": "297"}, "IN": {"countryName": "India", "phoneCode": "91"}, "AX": {"countryName": "Aland Islands", "phoneCode": "+358-18"}, "AZ": {"countryName": "Azerbaijan", "phoneCode": "994"}, "IE": {"countryName": "Ireland", "phoneCode": "353"}, "ID": {"countryName": "Indonesia", "phoneCode": "62"}, "UA": {"countryName": "Ukraine", "phoneCode": "380"}, "QA": {"countryName": "Qatar", "phoneCode": "974"}, "MZ": {"countryName": "Mozambique", "phoneCode": "258"}}


export const countryNames = {"Afghanistan": {"countryCode": "AF", "phoneCode": "93"}, "Aland Islands": {"countryCode": "AX", "phoneCode": "+358-18"}, "Albania": {"countryCode": "AL", "phoneCode": "355"}, "Algeria": {"countryCode": "DZ", "phoneCode": "213"}, "American Samoa": {"countryCode": "AS", "phoneCode": "+1-684"}, "Andorra": {"countryCode": "AD", "phoneCode": "376"}, "Angola": {"countryCode": "AO", "phoneCode": "244"}, "Anguilla": {"countryCode": "AI", "phoneCode": "+1-264"}, "Antarctica": {"countryCode": "AQ", "phoneCode": ""}, "Antigua and Barbuda": {"countryCode": "AG", "phoneCode": "+1-268"}, "Argentina": {"countryCode": "AR", "phoneCode": "54"}, "Armenia": {"countryCode": "AM", "phoneCode": "374"}, "Aruba": {"countryCode": "AW", "phoneCode": "297"}, "Australia": {"countryCode": "AU", "phoneCode": "61"}, "Austria": {"countryCode": "AT", "phoneCode": "43"}, "Azerbaijan": {"countryCode": "AZ", "phoneCode": "994"}, "Bahamas": {"countryCode": "BS", "phoneCode": "+1-242"}, "Bahrain": {"countryCode": "BH", "phoneCode": "973"}, "Bangladesh": {"countryCode": "BD", "phoneCode": "880"}, "Barbados": {"countryCode": "BB", "phoneCode": "+1-246"}, "Belarus": {"countryCode": "BY", "phoneCode": "375"}, "Belgium": {"countryCode": "BE", "phoneCode": "32"}, "Belize": {"countryCode": "BZ", "phoneCode": "501"}, "Benin": {"countryCode": "BJ", "phoneCode": "229"}, "Bermuda": {"countryCode": "BM", "phoneCode": "+1-441"}, "Bhutan": {"countryCode": "BT", "phoneCode": "975"}, "Bolivia": {"countryCode": "BO", "phoneCode": "591"}, "Bonaire, Saint Eustatius and Saba ": {"countryCode": "BQ", "phoneCode": "599"}, "Bosnia and Herzegovina": {"countryCode": "BA", "phoneCode": "387"}, "Botswana": {"countryCode": "BW", "phoneCode": "267"}, "Bouvet Island": {"countryCode": "BV", "phoneCode": ""}, "Brazil": {"countryCode": "BR", "phoneCode": "55"}, "British Indian Ocean Territory": {"countryCode": "IO", "phoneCode": "246"}, "British Virgin Islands": {"countryCode": "VG", "phoneCode": "+1-284"}, "Brunei": {"countryCode": "BN", "phoneCode": "673"}, "Bulgaria": {"countryCode": "BG", "phoneCode": "359"}, "Burkina Faso": {"countryCode": "BF", "phoneCode": "226"}, "Burundi": {"countryCode": "BI", "phoneCode": "257"}, "Cambodia": {"countryCode": "KH", "phoneCode": "855"}, "Cameroon": {"countryCode": "CM", "phoneCode": "237"}, "Canada": {"countryCode": "CA", "phoneCode": "1"}, "Cape Verde": {"countryCode": "CV", "phoneCode": "238"}, "Cayman Islands": {"countryCode": "KY", "phoneCode": "+1-345"}, "Central African Republic": {"countryCode": "CF", "phoneCode": "236"}, "Chad": {"countryCode": "TD", "phoneCode": "235"}, "Chile": {"countryCode": "CL", "phoneCode": "56"}, "China": {"countryCode": "CN", "phoneCode": "86"}, "Christmas Island": {"countryCode": "CX", "phoneCode": "61"}, "Cocos Islands": {"countryCode": "CC", "phoneCode": "61"}, "Colombia": {"countryCode": "CO", "phoneCode": "57"}, "Comoros": {"countryCode": "KM", "phoneCode": "269"}, "Cook Islands": {"countryCode": "CK", "phoneCode": "682"}, "Costa Rica": {"countryCode": "CR", "phoneCode": "506"}, "Croatia": {"countryCode": "HR", "phoneCode": "385"}, "Cuba": {"countryCode": "CU", "phoneCode": "53"}, "Curacao": {"countryCode": "CW", "phoneCode": "599"}, "Cyprus": {"countryCode": "CY", "phoneCode": "357"}, "Czech Republic": {"countryCode": "CZ", "phoneCode": "420"}, "Democratic Republic of the Congo": {"countryCode": "CD", "phoneCode": "243"}, "Denmark": {"countryCode": "DK", "phoneCode": "45"}, "Djibouti": {"countryCode": "DJ", "phoneCode": "253"}, "Dominica": {"countryCode": "DM", "phoneCode": "+1-767"}, "Dominican Republic": {"countryCode": "DO", "phoneCode": "+1-809 and 1-829"}, "East Timor": {"countryCode": "TL", "phoneCode": "670"}, "Ecuador": {"countryCode": "EC", "phoneCode": "593"}, "Egypt": {"countryCode": "EG", "phoneCode": "20"}, "El Salvador": {"countryCode": "SV", "phoneCode": "503"}, "Equatorial Guinea": {"countryCode": "GQ", "phoneCode": "240"}, "Eritrea": {"countryCode": "ER", "phoneCode": "291"}, "Estonia": {"countryCode": "EE", "phoneCode": "372"}, "Ethiopia": {"countryCode": "ET", "phoneCode": "251"}, "Falkland Islands": {"countryCode": "FK", "phoneCode": "500"}, "Faroe Islands": {"countryCode": "FO", "phoneCode": "298"}, "Fiji": {"countryCode": "FJ", "phoneCode": "679"}, "Finland": {"countryCode": "FI", "phoneCode": "358"}, "France": {"countryCode": "FR", "phoneCode": "33"}, "French Guiana": {"countryCode": "GF", "phoneCode": "594"}, "French Polynesia": {"countryCode": "PF", "phoneCode": "689"}, "French Southern Territories": {"countryCode": "TF", "phoneCode": ""}, "Gabon": {"countryCode": "GA", "phoneCode": "241"}, "Gambia": {"countryCode": "GM", "phoneCode": "220"}, "Georgia": {"countryCode": "GE", "phoneCode": "995"}, "Germany": {"countryCode": "DE", "phoneCode": "49"}, "Ghana": {"countryCode": "GH", "phoneCode": "233"}, "Gibraltar": {"countryCode": "GI", "phoneCode": "350"}, "Greece": {"countryCode": "GR", "phoneCode": "30"}, "Greenland": {"countryCode": "GL", "phoneCode": "299"}, "Grenada": {"countryCode": "GD", "phoneCode": "+1-473"}, "Guadeloupe": {"countryCode": "GP", "phoneCode": "590"}, "Guam": {"countryCode": "GU", "phoneCode": "+1-671"}, "Guatemala": {"countryCode": "GT", "phoneCode": "502"}, "Guernsey": {"countryCode": "GG", "phoneCode": "+44-1481"}, "Guinea": {"countryCode": "GN", "phoneCode": "224"}, "Guinea-Bissau": {"countryCode": "GW", "phoneCode": "245"}, "Guyana": {"countryCode": "GY", "phoneCode": "592"}, "Haiti": {"countryCode": "HT", "phoneCode": "509"}, "Heard Island and McDonald Islands": {"countryCode": "HM", "phoneCode": " "}, "Honduras": {"countryCode": "HN", "phoneCode": "504"}, "Hong Kong": {"countryCode": "HK", "phoneCode": "852"}, "Hungary": {"countryCode": "HU", "phoneCode": "36"}, "Iceland": {"countryCode": "IS", "phoneCode": "354"}, "India": {"countryCode": "IN", "phoneCode": "91"}, "Indonesia": {"countryCode": "ID", "phoneCode": "62"}, "Iran": {"countryCode": "IR", "phoneCode": "98"}, "Iraq": {"countryCode": "IQ", "phoneCode": "964"}, "Ireland": {"countryCode": "IE", "phoneCode": "353"}, "Isle of Man": {"countryCode": "IM", "phoneCode": "+44-1624"}, "Israel": {"countryCode": "IL", "phoneCode": "972"}, "Italy": {"countryCode": "IT", "phoneCode": "39"}, "Ivory Coast": {"countryCode": "CI", "phoneCode": "225"}, "Jamaica": {"countryCode": "JM", "phoneCode": "+1-876"}, "Japan": {"countryCode": "JP", "phoneCode": "81"}, "Jersey": {"countryCode": "JE", "phoneCode": "+44-1534"}, "Jordan": {"countryCode": "JO", "phoneCode": "962"}, "Kazakhstan": {"countryCode": "KZ", "phoneCode": "7"}, "Kenya": {"countryCode": "KE", "phoneCode": "254"}, "Kiribati": {"countryCode": "KI", "phoneCode": "686"}, "Kosovo": {"countryCode": "XK", "phoneCode": ""}, "Kuwait": {"countryCode": "KW", "phoneCode": "965"}, "Kyrgyzstan": {"countryCode": "KG", "phoneCode": "996"}, "Laos": {"countryCode": "LA", "phoneCode": "856"}, "Latvia": {"countryCode": "LV", "phoneCode": "371"}, "Lebanon": {"countryCode": "LB", "phoneCode": "961"}, "Lesotho": {"countryCode": "LS", "phoneCode": "266"}, "Liberia": {"countryCode": "LR", "phoneCode": "231"}, "Libya": {"countryCode": "LY", "phoneCode": "218"}, "Liechtenstein": {"countryCode": "LI", "phoneCode": "423"}, "Lithuania": {"countryCode": "LT", "phoneCode": "370"}, "Luxembourg": {"countryCode": "LU", "phoneCode": "352"}, "Macao": {"countryCode": "MO", "phoneCode": "853"}, "Macedonia": {"countryCode": "MK", "phoneCode": "389"}, "Madagascar": {"countryCode": "MG", "phoneCode": "261"}, "Malawi": {"countryCode": "MW", "phoneCode": "265"}, "Malaysia": {"countryCode": "MY", "phoneCode": "60"}, "Maldives": {"countryCode": "MV", "phoneCode": "960"}, "Mali": {"countryCode": "ML", "phoneCode": "223"}, "Malta": {"countryCode": "MT", "phoneCode": "356"}, "Marshall Islands": {"countryCode": "MH", "phoneCode": "692"}, "Martinique": {"countryCode": "MQ", "phoneCode": "596"}, "Mauritania": {"countryCode": "MR", "phoneCode": "222"}, "Mauritius": {"countryCode": "MU", "phoneCode": "230"}, "Mayotte": {"countryCode": "YT", "phoneCode": "262"}, "Mexico": {"countryCode": "MX", "phoneCode": "52"}, "Micronesia": {"countryCode": "FM", "phoneCode": "691"}, "Moldova": {"countryCode": "MD", "phoneCode": "373"}, "Monaco": {"countryCode": "MC", "phoneCode": "377"}, "Mongolia": {"countryCode": "MN", "phoneCode": "976"}, "Montenegro": {"countryCode": "ME", "phoneCode": "382"}, "Montserrat": {"countryCode": "MS", "phoneCode": "+1-664"}, "Morocco": {"countryCode": "MA", "phoneCode": "212"}, "Mozambique": {"countryCode": "MZ", "phoneCode": "258"}, "Myanmar": {"countryCode": "MM", "phoneCode": "95"}, "Namibia": {"countryCode": "NA", "phoneCode": "264"}, "Nauru": {"countryCode": "NR", "phoneCode": "674"}, "Nepal": {"countryCode": "NP", "phoneCode": "977"}, "Netherlands": {"countryCode": "NL", "phoneCode": "31"}, "New Caledonia": {"countryCode": "NC", "phoneCode": "687"}, "New Zealand": {"countryCode": "NZ", "phoneCode": "64"}, "Nicaragua": {"countryCode": "NI", "phoneCode": "505"}, "Niger": {"countryCode": "NE", "phoneCode": "227"}, "Nigeria": {"countryCode": "NG", "phoneCode": "234"}, "Niue": {"countryCode": "NU", "phoneCode": "683"}, "Norfolk Island": {"countryCode": "NF", "phoneCode": "672"}, "North Korea": {"countryCode": "KP", "phoneCode": "850"}, "Northern Mariana Islands": {"countryCode": "MP", "phoneCode": "+1-670"}, "Norway": {"countryCode": "NO", "phoneCode": "47"}, "Oman": {"countryCode": "OM", "phoneCode": "968"}, "Pakistan": {"countryCode": "PK", "phoneCode": "92"}, "Palau": {"countryCode": "PW", "phoneCode": "680"}, "Palestinian Territory": {"countryCode": "PS", "phoneCode": "970"}, "Panama": {"countryCode": "PA", "phoneCode": "507"}, "Papua New Guinea": {"countryCode": "PG", "phoneCode": "675"}, "Paraguay": {"countryCode": "PY", "phoneCode": "595"}, "Peru": {"countryCode": "PE", "phoneCode": "51"}, "Philippines": {"countryCode": "PH", "phoneCode": "63"}, "Pitcairn": {"countryCode": "PN", "phoneCode": "870"}, "Poland": {"countryCode": "PL", "phoneCode": "48"}, "Portugal": {"countryCode": "PT", "phoneCode": "351"}, "Puerto Rico": {"countryCode": "PR", "phoneCode": "+1-787 and 1-939"}, "Qatar": {"countryCode": "QA", "phoneCode": "974"}, "Republic of the Congo": {"countryCode": "CG", "phoneCode": "242"}, "Reunion": {"countryCode": "RE", "phoneCode": "262"}, "Romania": {"countryCode": "RO", "phoneCode": "40"}, "Russia": {"countryCode": "RU", "phoneCode": "7"}, "Rwanda": {"countryCode": "RW", "phoneCode": "250"}, "Saint Barthelemy": {"countryCode": "BL", "phoneCode": "590"}, "Saint Helena": {"countryCode": "SH", "phoneCode": "290"}, "Saint Kitts and Nevis": {"countryCode": "KN", "phoneCode": "+1-869"}, "Saint Lucia": {"countryCode": "LC", "phoneCode": "+1-758"}, "Saint Martin": {"countryCode": "MF", "phoneCode": "590"}, "Saint Pierre and Miquelon": {"countryCode": "PM", "phoneCode": "508"}, "Saint Vincent and the Grenadines": {"countryCode": "VC", "phoneCode": "+1-784"}, "Samoa": {"countryCode": "WS", "phoneCode": "685"}, "San Marino": {"countryCode": "SM", "phoneCode": "378"}, "Sao Tome and Principe": {"countryCode": "ST", "phoneCode": "239"}, "Saudi Arabia": {"countryCode": "SA", "phoneCode": "966"}, "Senegal": {"countryCode": "SN", "phoneCode": "221"}, "Serbia": {"countryCode": "RS", "phoneCode": "381"}, "Seychelles": {"countryCode": "SC", "phoneCode": "248"}, "Sierra Leone": {"countryCode": "SL", "phoneCode": "232"}, "Singapore": {"countryCode": "SG", "phoneCode": "65"}, "Sint Maarten": {"countryCode": "SX", "phoneCode": "599"}, "Slovakia": {"countryCode": "SK", "phoneCode": "421"}, "Slovenia": {"countryCode": "SI", "phoneCode": "386"}, "Solomon Islands": {"countryCode": "SB", "phoneCode": "677"}, "Somalia": {"countryCode": "SO", "phoneCode": "252"}, "South Africa": {"countryCode": "ZA", "phoneCode": "27"}, "South Georgia and the South Sandwich Islands": {"countryCode": "GS", "phoneCode": ""}, "South Korea": {"countryCode": "KR", "phoneCode": "82"}, "South Sudan": {"countryCode": "SS", "phoneCode": "211"}, "Spain": {"countryCode": "ES", "phoneCode": "34"}, "Sri Lanka": {"countryCode": "LK", "phoneCode": "94"}, "Sudan": {"countryCode": "SD", "phoneCode": "249"}, "Suriname": {"countryCode": "SR", "phoneCode": "597"}, "Svalbard and Jan Mayen": {"countryCode": "SJ", "phoneCode": "47"}, "Swaziland": {"countryCode": "SZ", "phoneCode": "268"}, "Sweden": {"countryCode": "SE", "phoneCode": "46"}, "Switzerland": {"countryCode": "CH", "phoneCode": "41"}, "Syria": {"countryCode": "SY", "phoneCode": "963"}, "Taiwan": {"countryCode": "TW", "phoneCode": "886"}, "Tajikistan": {"countryCode": "TJ", "phoneCode": "992"}, "Tanzania": {"countryCode": "TZ", "phoneCode": "255"}, "Thailand": {"countryCode": "TH", "phoneCode": "66"}, "Togo": {"countryCode": "TG", "phoneCode": "228"}, "Tokelau": {"countryCode": "TK", "phoneCode": "690"}, "Tonga": {"countryCode": "TO", "phoneCode": "676"}, "Trinidad and Tobago": {"countryCode": "TT", "phoneCode": "+1-868"}, "Tunisia": {"countryCode": "TN", "phoneCode": "216"}, "Turkey": {"countryCode": "TR", "phoneCode": "90"}, "Turkmenistan": {"countryCode": "TM", "phoneCode": "993"}, "Turks and Caicos Islands": {"countryCode": "TC", "phoneCode": "+1-649"}, "Tuvalu": {"countryCode": "TV", "phoneCode": "688"}, "U.S. Virgin Islands": {"countryCode": "VI", "phoneCode": "+1-340"}, "Uganda": {"countryCode": "UG", "phoneCode": "256"}, "Ukraine": {"countryCode": "UA", "phoneCode": "380"}, "United Arab Emirates": {"countryCode": "AE", "phoneCode": "971"}, "United Kingdom": {"countryCode": "GB", "phoneCode": "44"}, "United States": {"countryCode": "US", "phoneCode": "1"}, "United States Minor Outlying Islands": {"countryCode": "UM", "phoneCode": "1"}, "Uruguay": {"countryCode": "UY", "phoneCode": "598"}, "Uzbekistan": {"countryCode": "UZ", "phoneCode": "998"}, "Vanuatu": {"countryCode": "VU", "phoneCode": "678"}, "Vatican": {"countryCode": "VA", "phoneCode": "379"}, "Venezuela": {"countryCode": "VE", "phoneCode": "58"}, "Vietnam": {"countryCode": "VN", "phoneCode": "84"}, "Wallis and Futuna": {"countryCode": "WF", "phoneCode": "681"}, "Western Sahara": {"countryCode": "EH", "phoneCode": "212"}, "Yemen": {"countryCode": "YE", "phoneCode": "967"}, "Zambia": {"countryCode": "ZM", "phoneCode": "260"}, "Zimbabwe": {"countryCode": "ZW", "phoneCode": "263"}}


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  previousFormLengthOnlyDigits: number;

  signUpPhoneForm: FormGroup;
  signUpEmailForm: FormGroup;

  phoneInputValue;

  countryCodeValue: string;
  phoneCodeValue: string;

  phoneFormValid: boolean;

  public simInfo;

  public direction: boolean;


  signUpMethod: string = "phone";

  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _fb: FormBuilder,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private _afAuth: AngularFireAuth,
    public userInfo: UserInfoProvider)
  {
    // we only need to initialy define the length of previous.
    this.previousFormLengthOnlyDigits = 0;
    this.direction = true;
    this.phoneInputValue = ''
    this.buildSignUpPhoneForm();
    this.phoneFormValid = false;

    this.assignCountryCode();
  }

  assignCountryCode(){
    let countryCode = this.userInfo.simCountryCode;
    if( countryCode ){
      this.phoneCodeValue = countryCodes[countryCode].phoneCode;
      this.countryCodeValue = countryCode;
    } else {
      this.countryCodeValue = 'US'
      this.phoneCodeValue = '1'
    }
  }


  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  onContinue(){
    const appVerifier = this.recaptchaVerifier;
    // const phoneNumberString = this.
  }


  buildSignUpPhoneForm(){
    this.signUpPhoneForm = this._fb.group({
      phone: [''],
      countryCode: ['1']
    })

    this.signUpPhoneForm.valueChanges.subscribe( data=> {
      this.watchPhoneForm(data);
    })
  }

  /*
   * Here we are subscribed to and data change in the phone form input field.
   **/
  watchPhoneForm(data?: any) {
    const phoneForm = this.signUpPhoneForm;
    let phoneFormLength = phoneForm.value.phone.length;
    let currentFormLengthOnlyDigits: number;
    console.log("TALLY: " + phoneForm.value.phone.length)

    // if the form hasn't been instantiated, we return.
    if(!phoneForm){
      this.phoneFormValid = false;
      return;
    } // if the form has a zero length.
    else if(phoneForm.value.phone.length == 0){
      currentFormLengthOnlyDigits = 0;
      this.previousFormLengthOnlyDigits = 0;
      this.phoneFormValid = false;
      return;
    } else if( (phoneForm.value.phone.length == 1) || (phoneForm.value.phone.length == 2) || (phoneForm.value.phone.length == 3) ){
      this.phoneFormValid = true;
      console.log("The current length is: " + phoneForm.value.phone.length);
      return;
    } else {
      // everything else here
      currentFormLengthOnlyDigits = this.returnOnlyTelDigits(phoneForm.value.phone);
      console.log('Current length: ' + currentFormLengthOnlyDigits);
      console.log('Previous length: ' + this.previousFormLengthOnlyDigits)

      // console.log('The input is positive');
      if(phoneFormLength == 4){
        if( currentFormLengthOnlyDigits > this.previousFormLengthOnlyDigits) {
          let splitValues = phoneForm.value.phone.split('');
          splitValues.splice(3,0,'-')
          let returnString = splitValues.join('');
          this.phoneInputValue = returnString;
        } else {
          let splitValues = phoneForm.value.phone.split('');
          splitValues.splice(3,0)
          let returnString = splitValues.join('');
          this.phoneInputValue = returnString;

        }
      } else if((phoneFormLength == 5) || (phoneFormLength == 6) || (phoneFormLength == 7) || (phoneFormLength == 8)){

        return;
      } else if(phoneFormLength == 9){
        if( currentFormLengthOnlyDigits > this.previousFormLengthOnlyDigits) {
          let splitValues = phoneForm.value.phone.split('');
          splitValues.splice(0,0,'(');
          splitValues.splice(4,0,')');
          splitValues.splice(5,1,' ');
          splitValues.splice(9,0,'-');
          let returnString = splitValues.join('');
          this.phoneInputValue = returnString;
        } else {
          return;

        }
      } else if(phoneFormLength == 11) {
          let splitValues = phoneForm.value.phone.split('');
          splitValues.splice(0,1);
          splitValues.splice(3,2,'-');
          splitValues.splice(7,1);
          let returnString = splitValues.join('');
          this.phoneInputValue = returnString;
      }
    }


    // pass on the formLengthOnlyDigits value for the next function call;
    if(phoneForm){
     this.previousFormLengthOnlyDigits = currentFormLengthOnlyDigits;
    }

  }


  /*
   * Returns the length of a string after filtering out everything that's not a digit{0-9}
   * The regex: https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
   * Checking if a character is a number: https://stackoverflow.com/questions/23437476/in-typescript-how-to-check-if-a-string-is-numeric
   **/
  returnOnlyTelDigits(inputString: string) {
    let returnLength: number = 0;

    // Firstly we remove any whtiespace from the string. ".isNaN()" returns false for whtiespace
    inputString = inputString.replace(/\s+/g, '');

    for (var i = 0; i < inputString.length; i++) {
      let characterValue = inputString.charAt(i)
      // we use '+', the unary plus operator as a shorthand for 'Number(inputString.charAt(i)'' )
      if( +inputString.charAt(i)){
        returnLength +=1 ;
      }
    }
    // console.log("Return length is: " + returnLength);
    return returnLength;
  }


 // console.log(s.charAt(i));


  pickCountryCode(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Country code');

    for ( let item in countryNames ) {
      alert.addInput({
        type: 'radio',
        label: item + ' ' + "(" + countryNames[item].phoneCode + ")",
        value: countryNames[item].countryCode
      })
    }
    alert.addButton('Cancel'),
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.countryCodeValue = data;
        this.phoneCodeValue = countryCodes[data].phoneCode;
      }
    })

    alert.present();
  }








}