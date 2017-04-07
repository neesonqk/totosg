#!/usr/bin/env node
const cheerio = require('cheerio')
const phantom = require('phantom')
const _ = require('lodash')
const Table = require('cli-table');
const random = require('node-random-number')
const trim = require('trim')

var pjson = require('./package.json')

var command = process.argv[2]

switch (command) {
    case "-v":
        console.log(pjson.version);
        break;
    case "-h":
        var table = new Table({
            head: ['Command', 'Description']
        });
        table.push(["gen, generate", "Generate 3 random draws."])
        table.push(["get, [blank]", "Get latest toto result."])
        console.log(table.toString());
        break;
    case "gen":
    case "generate":
        var table = new Table({
            head: [' ', 'One', 'Two', 'Three', 'Four', 'Five', 'Six']
        });
        for (var i = 0; i < 3; i++) {
            var rNum = _.orderBy(random({start: 1, end: 49, count: 6}), [], 'asc');
            rNum.unshift("Draw " + (i+1));
            table.push(rNum);
        }
        console.log("");
        console.log("Quick Picks:");
        console.log(table.toString());
        console.log("");
        break;
    case "get":
    default:
    getFromServer();
}

function getFromServer() {
    console.log("Retrieving latest toto result...");
    phantom.create(['--ignore-ssl-errors=yes', '--load-images=no'], {logLevel: 'error'}).then(ph => {
        _ph = ph;
        return _ph.createPage();
    }).then(page => {
        _page = page;
        //return _page.open('http://www.singaporepools.com.sg/en/product/Pages/toto_results.aspx');
        return _page.open('http://www.singaporepools.com.sg/en/product/sr/Pages/toto_results.aspx');
    }).then(status => {
        return _page.property('content')
    }).then(content => {
        const $ = cheerio.load(content);
        const tables = $('.divSingleDraw table');

        //get date & draw No.
        const ths = tables.eq(0).find('thead th')
        const date = ths.eq(0).text();
        const drawNo = ths.eq(1).text();

        //get lucky numbers
        const tds = tables.eq(1).find('tbody td');

        //additional number
        const additionalNum = tables.eq(2).find('tbody td').text();

        //group 1 amount & share number
        const group1Amt = tables.eq(3).find('tbody td').text();

        //outlets
        const div = $('.divWinningOutlets');
        const groupTitles = div.find('strong');
        const uls = div.find('ul');

        var table = new Table({
            head: ['Date', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Additional Number']
        });

        console.log("");
        console.log(drawNo, "Group 1 Prize: " + group1Amt);
        //console.log('%s, %s, %s, %s, %s, %s', tds.eq(0).text(), tds.eq(1).text(), tds.eq(2).text(), tds.eq(3).text(), tds.eq(4).text(), tds.eq(5).text(), tds.eq(6).text());
        table.push(
            [
                date,
                tds.eq(0).text(), tds.eq(1).text(), tds.eq(2).text(), tds.eq(3).text(), tds.eq(4).text(), tds.eq(5).text(),
                additionalNum
            ]
        )
        console.log(table.toString());

        //group 1 outlets
        console.log(groupTitles.eq(0).text());
        for (var i = 0; i < uls.eq(0).find('li').length; i++) {
            console.log("## " + trim(uls.eq(0).find('li').eq(i).text()));
        }

        //group 2 outlets
        console.log(groupTitles.eq(1).text());
        for (var i = 0; i < uls.eq(1).find('li').length; i++) {
            console.log("## " + trim(uls.eq(1).find('li').eq(i).text()));
        }

        console.log("");
        console.log("Existing...")
        console.log("");
        _page.close();
        _ph.exit();
    }).catch(e => console.log(e));
}

// (function() {
//     var toto = {};
//     exports.getLastResult = toto.getLastResult = function() {
//         console.log("Establishing connection...");
//         phantom.create([], {logLevel: 'error'}).then(ph => {
//             _ph = ph;
//             return _ph.createPage();
//         }).then(page => {
//             _page = page;
//             return _page.open('http://www.singaporepools.com.sg/en/product/Pages/toto_results.aspx');
//         }).then(status => {
//             return _page.property('content')
//         }).then(content => {
//             console.log("Parsing content...");
//             const $ = cheerio.load(content);
//             const tables = $('ul.ulDraws table');
//
//             //get date & draw No.
//             const ths = tables.eq(0).find('thead th')
//             const date = ths.eq(0).text();
//             const drawNo = ths.eq(1).text();
//
//             //get lucky numbers
//             const tds = tables.eq(1).find('tbody td');
//
//             console.log("TOTO result on %s, Draw No.: %s", date, drawNo);
//             console.log('%s, %s, %s, %s, %s, %s', tds.eq(0).text(), tds.eq(1).text(), tds.eq(2).text(), tds.eq(3).text(), tds.eq(4).text(), tds.eq(5).text(), tds.eq(6).text());
//
//             console.log("Exiting...");
//             _page.close();
//             _ph.exit();
//         }).catch(e => console.log(e));
//     }
//     if (!module.parent) {
//         toto.getLastResult();
//     }
// })();
