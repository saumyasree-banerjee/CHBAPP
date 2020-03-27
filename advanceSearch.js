'use strict';
var paramsData = '';
var columnCount = 1;
var sessionHTMLData = '';
var tableDisplayRowCount = 10;
var columnETA;
var columnETD;
var PortOfEntryDate;
var InsertedTime;
var UpdatedTime;
var IsActive;
var EntryMetaDataID;
var Level;
var IsDocumentPresent;
var Customer;
var DocumentStatus;
var RadioButton;
var recordText = 'TOP 200 records displayed. Please use search criteria for more results.';
var currPageSize = 10;
var currPageNumber = 1;
var sortColumnName = '';
var sortColumnOrder = 'DESC';
var sortColumnIndex = 0;
var saveSearchData = '';
var searchFlag = false;
var currSearchJSONData;
var flexfieldsJSONData = [];
var flexDomSelectedSearch = [];
var currentColumn = '';
function addRow(rowNo) {
    var checkValues = $('input[class=columnCheckBox]:checked').map(function () {
        return $(this).val();
    }).get();
    if (checkValues.length !== 0) {
        columnCount = checkValues.length - 1;
    } else {
        columnCount = 100;
    }

    if (columnCount >= rowNo) {
        var htmlHead = '<div id = "searchRows' + (Number(rowNo) + 1) + '">';
        var htmlBody = '<div class="col-md-12 rowCol"><div class="col-md-3"><select class="form-control columnList" id="columnList' + (Number(rowNo) + 1) + '" onchange="getOperator(\'' + (Number(rowNo) + 1) + '\')"></select></div><div class="col-md-3"><select class="form-control" id="operator' + (Number(rowNo) + 1) + '" onchange="checkOperatorType(\'' + (Number(rowNo) + 1) + '\');"></select></div><div class="col-md-3" id="valueList' + (Number(rowNo) + 1) + '"></div><div class="col-md-3"><button id="buttonAdd' + (Number(rowNo) + 1) + '" type="button" class="btn btn-default btn-sm" onclick="addRow(\'' + (Number(rowNo) + 1) + '\');"><span class="glyphicon glyphicon-plus"></span></button>&nbsp;&nbsp;<button type="button" id="buttonRemove' + (Number(rowNo) + 1) + '" class="btn btn-default btn-sm" onclick="removeRow(\'' + (Number(rowNo) + 1) + '\');"><span class="glyphicon glyphicon-minus"></span></button></div></div></div>';
        $('#searchContainer').append(htmlHead + htmlBody);
        $('#buttonAdd' + rowNo).attr('disabled', 'disabled');
        getColumnList(Number(rowNo) + 1);
        getOperator(Number(rowNo) + 1);
    } else {
        alert('No more columns exists');
    }
    if (rowNo >= 1) {
        $('#buttonRemove1').removeAttr('disabled');
    }
}
function addSearchRow(rowNo) {
    var checkValues = $('input[class=columnCheckBox]:checked').map(function () {
        return $(this).val();
    }).get();
    if (checkValues.length !== 0) {
        columnCount = checkValues.length - 1;
    } else {
        columnCount = 100;
    }

    //if (columnCount >= rowNo) {
        var htmlHead = '<div id = "searchRows' + (Number(rowNo) + 1) + '">';
        var htmlBody = '<div class="col-md-12 rowCol"><div class="col-md-3"><select class="form-control columnList" id="columnList' + (Number(rowNo) + 1) + '" onchange="getOperator(\'' + (Number(rowNo) + 1) + '\')"></select></div><div class="col-md-3"><select class="form-control" id="operator' + (Number(rowNo) + 1) + '" onchange="checkOperatorType(\'' + (Number(rowNo) + 1) + '\');"></select></div><div class="col-md-3" id="valueList' + (Number(rowNo) + 1) + '"></div><div class="col-md-3"><button id="buttonAdd' + (Number(rowNo) + 1) + '" type="button" class="btn btn-default btn-sm" onclick="addRow(\'' + (Number(rowNo) + 1) + '\');"><span class="glyphicon glyphicon-plus"></span></button>&nbsp;&nbsp;<button type="button" id="buttonRemove' + (Number(rowNo) + 1) + '" class="btn btn-default btn-sm" onclick="removeRow(\'' + (Number(rowNo) + 1) + '\');"><span class="glyphicon glyphicon-minus"></span></button></div></div></div>';
        $('#searchContainer').append(htmlHead + htmlBody);
        $('#buttonAdd' + rowNo).attr('disabled', 'disabled');
        getColumnList(Number(rowNo) + 1);
        getOperator(Number(rowNo) + 1);
    //} else {
       // alert('No more columns exists');
    //}
    if (rowNo >= 1) {
        $('#buttonRemove1').removeAttr('disabled');
    }
}
function removeRow(rowNo) {
    var childCount = $('#searchContainer').children().length;
    if (childCount > 1) {
        $('#searchRows' + rowNo).remove();
        var idCount = 1;
        var idCount1 = 1;
        var idCount2 = 1;
        var buttonAdd = 1;
        var valueList = 1;
        var buttonRemove = 1;
        $('[id^=columnList]').each(function () {
            $(this).attr('id', 'columnList' + idCount);
            $(this).attr('onchange', 'getOperator("' + idCount + '")');
            idCount++;
        });
        $('[id^=operator]').each(function () {
            $(this).attr('id', 'operator' + idCount2);
            $(this).attr('onchange', 'checkOperatorType("' + idCount2 + '")');
            idCount2++;
        });

        $('[id^=searchRows]').each(function () {
            $(this).attr('id', 'searchRows' + idCount1);
            idCount1++;
        });
        $('[id^=valueList]').each(function () {
            $(this).attr('id', 'valueList' + valueList);
            valueList++;
        });
        $('[id^=buttonAdd]').each(function () {
            $(this).attr('id', 'buttonAdd' + buttonAdd);
            $(this).attr('onclick', 'addRow("' + buttonAdd + '")');
            buttonAdd++;
        });
        $('[id^=buttonRemove]').each(function () {
            $(this).attr('id', 'buttonRemove' + buttonRemove);
            $(this).attr('onclick', 'removeRow("' + buttonRemove + '")');
            buttonRemove++;
        });
    } else {
        $('#buttonRemove1').attr('disabled', 'disabled');
    }
    if (childCount === 2) {
        $('#buttonRemove1').attr('disabled', 'disabled');
    } else {
        $('#buttonRemove1').removeAttr('disabled');
    }
    $('#buttonAdd' + (rowNo - 1)).removeAttr("disabled");

}
function clearRows() {
    $('#searchContainer > div').not(':first').remove();
    $('[id^=buttonAdd]').removeAttr('disabled');
    $('.columnList').removeClass('dymicClass');
    $('#columnList1').val(null);
    $('#operator1').val(null);
    $('#valueList1 select').val(null);
    $('#valueList1 input').val(null);
    $('#savedSearchTxt').hide();
    $("#saveSearchCriteria").html('').hide();
}
/*window.addEventListener('load', function() {
   
});*/
function flexClick() {
    getColumnList();
    getHomeData();
}
$(document).ready(function () {
    flexDomSelectedSearch = [];
    var currentpageURL = getCurrentURL();
    $('.columnCheckBox, #checkAll').click(function () {
        getColumnList();
        getHomeData();
    });
    $('#checkAll').click(function () {
        $('input:checkbox').not(this).not('#checkIncludeStatus').prop('checked', this.checked);
        getColumnList();
        getHomeData();
    });
    $('.columnList').click(function () {
        $('.columnList').removeClass('dymicClass');
    });

    $("#dispalySearchBtn").click(function () {
        $("#displaysearchbox").toggle();
    });
    if (sessionStorage.length === 0 || sessionStorage.getItem('currPageNumber') === 'undefined') {
        getData(null);
        getColumnList('1');
        checkOperatorType('1');
    } else if (currentpageURL !== localStorage.getItem('lastURL')) {
        getData(null);
        getColumnList('1');
        checkOperatorType('1');
    }
    else { getData(null); }
    getSearchResults();
});
function getCheckedColumnList() {
    var htmlColumns = '';
    var childCount = $('#searchContainer').children().length;
    var checkValues = $('input[class=columnCheckBox]:checked').map(function () {
        return $(this).val();
    }).get();
    $.ajax({
        url: '/Home/GetColumnNames',
        data: {
        },
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            for (var k = 0; k <= checkValues.length - 1; k++) {
                for (var colCh = 1; colCh <= childCount; colCh++) {
                    var currSel = $('#columnList' + colCh + ' :selected').val();
                    for (var i = 0; i <= data.length - 1; i++) {
                        if (data[i].ColumnName !== 'RadioButton' && data[i].ColumnName !== 'IsActive') {
                            htmlColumns = htmlColumns + '<option value="' + data[i].ColumnName + '"  alt = "' + data[i].Type + '">' + data[i].DisplayName + '</option>';
                        }
                    }
                    $('#columnList' + colCh).html(htmlColumns);
                    $('#columnList' + colCh).addClass('dymicClass');
                    $('#columnList' + colCh).val(currSel).change();
                    if ($('#columnList' + colCh).val() === null) {
                        $("#columnList" + colCh + " option:last").attr("selected", "selected");
                    }
                    //getOperator(colCh);
                }
            }
        },
        error: function (xhr) {
            //alert('error');
        },
        complete: function () {
            //back to normal!
        }
    });
}
function getColumnList(rowNo) {
    var htmlColumns = '';
    var selectedColumnArray = [];
    for (var j = 1; j < rowNo; j++) {
        selectedColumnArray.push($('#columnList' + j).val());
    }
    var res = getCurrentURL();
    $.ajax({
        url: '/' + res + '/GetColumnNames',
        data: {
            jsonData: GetParameterValues()
        },
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            var checkValues = $('input[class=columnCheckBox]:checked').map(function () {
                return $(this).val();
            }).get();
            columnCount = checkValues.length - 1;
            if (checkValues.length !== 0) {
                for (var k = 0; k <= checkValues.length - 1; k++) {

                    for (var i = 0; i <= data.length - 1; i++) {
                        if (checkValues[k] === data[i].ColumnName) {
                            // var checkCurrentVal = selectedColumnArray.includes(data[i].ColumnName);

                            if (selectedColumnArray.indexOf(data[i].ColumnName) === -1) {
                                htmlColumns = htmlColumns + '<option value="' + data[i].ColumnName + '"  alt = "' + data[i].Type + '">' + data[i].DisplayName + '</option>';
                            }
                        }
                    }
                }
            } else {
                for (var p = 1; p <= data.length - 1; p++) {
                    htmlColumns = htmlColumns + '<option value="' + data[p].ColumnName + '"  alt = "' + data[p].Type + '">' + data[p].DisplayName + '</option>';
                }
            }
            $('#columnList' + rowNo).html(htmlColumns);
            getOperator(rowNo);
        },
        error: function (xhr) {
            //alert('error');
        },
        complete: function () {
            //back to normal!
        }
    });
}
function getOperator(rowNo) {
    $('#columnList' + rowNo + ' option').removeAttr('selected');
    if ($('#columnList' + rowNo).hasClass('dymicClass') === false) {
        var currentRowType = $('#columnList' + rowNo + ' :selected').attr("alt");
        var operatorList;
        if (currentRowType === 'String') {
            if ($('#columnList' + rowNo + ' :selected').val() !== 'Country' && $('#columnList' + rowNo + ' :selected').val() !== 'CountryName' && $('#columnList' + rowNo + ' :selected').val() !== 'SalesProgramName' && $('#columnList' + rowNo + ' :selected').val() !== 'Level' && $('#columnList' + rowNo + ' :selected').val() !== 'MaerskStatusName' && $('#columnList' + rowNo + ' :selected').val() !== 'CountryOfOrig' &&
                $('#columnList' + rowNo + ' :selected').val() !== 'SalesProgram') {
                operatorList = '<option value="Equal">Equals</option><option value="NotEqual">Not Equal</option><option value="Contains">Contains</option><option value="NotContains">Not Contains</option><option value="StartsWith">Starts With</option><option value="EndsWith">Ends With</option><option value="In_">In</option><option value="NotIn">Not In</option>';
            } else {
                operatorList = '<option value="Equal">Equals</option><option value="NotEqual">Not Equal</option>';
            }
        } else if (currentRowType === 'DateTime') {
            operatorList = '<option value="Equal">Equals</option><option value="NotEqual">Not Equal</option><option value="Range">Date Range</option><option value="GreaterThan">Greater Than</option><option value="LessThan">Less Than</option><option value="GreaterThanEqual">Greater Than or Equal</option><option value="LessThanEqual">Less Than or Equal</option>';
        } else if (currentRowType === 'Decimal' || currentRowType === 'Int32') {
            operatorList = '<option value="Equal">Equals</option><option value="NotEqual">Not Equal</option><option value="Range">Range</option><option value="GreaterThan">Greater Than</option><option value="LessThan">Less Than</option><option value="GreaterThanEqual">Greater Than or Equal</option><option value="LessThanEqual">Less Than or Equal</option><option value="In_">In</option><option value="NotIn">Not In</option>';
        } else if (currentRowType === 'Boolean') {
            operatorList = '<option value="BooleanEqual">Equals</option>';
        }
        $('#operator' + rowNo).html(operatorList);
        checkOperatorType(rowNo);
    }
}
function checkOperatorType(rowNo) {
    var currentRowType = $('#columnList' + rowNo + ' :selected').attr("alt");
    var currentOperatorType = $('#operator' + rowNo).val();
    var valueList;
    if (currentRowType === 'DateTime') {
        if (currentOperatorType === 'Range') {
            valueList = '<div class="col-md-6" style="padding-left:0px;"><input type="text" class="form-control range1" /></div><div class="col-md-6" style="padding-right:0px;"><input type="text" class="form-control range2" /></div>';
        } else {
            valueList = '<input type="text" class="form-control datepicker" />';
        }
        $('#valueList' + rowNo).html(valueList);
        $(".range1").datepicker();
        $(".range2").datepicker();
        $('.datepicker').datepicker();
        // $(".datepickerid to distroy").datepicker("destroy");
    }
    else if (currentRowType === 'Int32') {
        if (currentOperatorType === 'Range') {
            valueList = '<div class="col-md-6" style="padding-left:0px;"><input type="number" min="0" class="form-control range1" /></div><div class="col-md-6" style="padding-right:0px;"><input type="number" min="0" class="form-control range2" /></div>';
        } else if (currentOperatorType === 'In_' || currentOperatorType === 'NotIn') {
            valueList = '<input type="text" class="form-control" />';
        } else {
            valueList = '<input type="number" class="form-control" />';
        }
        $('#valueList' + rowNo).html(valueList);
    }
    else if (currentRowType === 'Decimal') {
        if (currentOperatorType === 'Range') {
            valueList = '<div class="col-md-6" style="padding-left:0px;"><input type="number" min="0" class="form-control range1" /></div><div class="col-md-6" style="padding-right:0px;"><input type="number" class="form-control range2" /></div>';
        } else if (currentOperatorType === 'In_' || currentOperatorType === 'NotIn') {
            valueList = '<input type="text" class="form-control" />';
        } else {
            valueList = '<input type="number" min="0" class="form-control" />';
        }
        $('#valueList' + rowNo).html(valueList);
    }
    else if (currentRowType === 'Boolean') {
        valueList = '<select class="form-control" onchange="clearValueSelected(\'' + rowNo + '\');"><option value="">Please select</option><option value="1">True</option><option value="0">False</option></select>';
        $('#valueList' + rowNo).html(valueList);
    }
    else if ($('#columnList' + rowNo + ' :selected').val() === 'Country') {
        getCountries(rowNo);

    }
    else if ($('#columnList' + rowNo + ' :selected').val() === 'CountryName') {
        getCountries(rowNo);

    }
    else if ($('#columnList' + rowNo + ' :selected').val() === 'MaerskStatusName') {
        getMaerskStatus(rowNo);

    }
    else if ($('#columnList' + rowNo + ' :selected').val() === 'Level') {
        getLevel(rowNo);

    }
    else if ($('#columnList' + rowNo + ' :selected').val() === 'CountryOfOrig') {
        getGlobalCountries(rowNo);

    }
    else if ($('#columnList' + rowNo + ' :selected').val() === 'SalesProgram') {
        getSalesProgram(rowNo);

    }
    else if ($('#columnList' + rowNo + ' :selected').val() === 'SalesProgramName') {
        getSalesProgram(rowNo);

    }
    else {
        valueList = '<input type="text" class="form-control" />';
        $('#valueList' + rowNo).html(valueList);
    }
}
function triggerSearch() {
    currPageSize = 10;
    currPageNumber = 1;
    $('#openSearchDialog').removeAttr('disabled');
    $('#savedSearchTxt').hide();
    $("#saveSearchCriteria").html('').hide();
    localStorage.removeItem('lastURL');
    sessionStorage.clear();
    searchFlag = false;
    getData();
}
function getCurrentURL() {
    var currUrl = window.location.href;
    var lastPos = currUrl.lastIndexOf('/');
    var pageRoute = currUrl.substring(lastPos + 1);
    if (pageRoute === '') {
        pageRoute = 'Home';
    }
    return pageRoute;
}

function getHomeData(params) {
    var jsonData = [];
    var columnETA;
    var columnETD;
    var PortOfEntryDate;
    var InsertedTime;
    var UpdatedTime;
    var IsActive;
    var EntryMetaDataID;
    var Level;
    var IsDocumentPresent;
    var Customer;
    var DocumentStatus;
    var RadioButton;

    tableDisplayRowCount = 10;
    var totalRecords = 0;
    if (sessionStorage.length === 0) {
        jsonData = GetParameterValues(params);
        localStorage.setItem("jsonData", jsonData);
    } else {
        if (paramsData !== '') {
            jsonData = paramsData;
        } else {
            jsonData = localStorage.getItem("jsonData");
        }

        var currentpageURL = getCurrentURL();
        if (currentpageURL === localStorage.getItem('lastURL')) {
            $('#searchContainer').html(sessionHTMLData);
        }
        currPageNumber = sessionStorage.getItem('currPageNumber');
        currPageSize = sessionStorage.getItem('currPageSize');
    }
    var modal = $('<div>').dialog({ modal: true });
    modal.dialog('widget').hide();
    $('#ajax_loader').show();
    $.ajax({
        url: '/Home/GetShipmentsByAjax',
        data: { JsonData: jsonData, pageSize: currPageSize, pageNumber: currPageNumber, sortColumn: 'EntryMetaDataID', sortType: 'DESC' },
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            //temp fix
            if (data.TotalRecordCount === undefined) {
                data.TotalRecordCount = data.length;
            }
            if (data.length === 200) {
                $('#totalRecords').html(data.TotalRecordCount + " Top ");
            }
            else {
                $('#totalRecords').html(data.TotalRecordCount);
            }
            totalRecords = data.TotalRecordCount;
            var tableDisplaySessionRowCount = sessionStorage.getItem("filterLength");
            if (tableDisplaySessionRowCount === null) {
                tableDisplayRowCount = $("[name=filterDataTable_length]").val();
                if (typeof tableDisplayRowCount === 'undefined') {
                    tableDisplayRowCount = 10;
                }
            } else {
                tableDisplayRowCount = tableDisplaySessionRowCount;
            }
            var columns = [];
            var checkValues = $('input[class=columnCheckBox]:checked').map(function () {
                if ($(this).attr('name') !== 'flexCheck') {
                    return $(this).val();
                }
                
            }).get();
            var checkTexts = $('input[class=columnCheckBox]:checked').map(function () {
                if ($(this).attr('name') !== 'flexCheck') {
                    return $(this).attr("alt");
                }
            }).get();
            var checkFlexValues = $('input[class=columnCheckBox]:checked').map(function () {
                if ($(this).attr('name') === 'flexCheck') {
                    return $(this).attr("alt");
                }

            }).get();
            var checkFlexIds = $('input[class=columnCheckBox]:checked').map(function () {
                if ($(this).attr('name') === 'flexCheck') {
                    return $(this).attr("id").substr(9);
                }

            }).get();
            if (checkFlexValues === undefined) {
                checkFlexValues = [];
            }
            if (checkValues.length > 0) {
                checkValues.unshift("RadioButton");
                checkTexts.unshift("");
            }
            for (var k = 0; k <= checkValues.length - 1; k++) {
                columns.push({ data: checkValues[k], title: checkTexts[k] });
            }
            for (var l = 0; l <= checkFlexValues.length - 1; l++) {
                columns.push({ data: checkFlexValues[l], title: checkFlexValues[l] });
            }
            // console.log(columns, ' -- Col');
            flexfieldsJSONData = [];
            if (data.EntryMetadataLists !== null) {
                if (data.EntryMetadataLists.length > 0) {
                    if (data.EntryMetadataLists[0].FlexFieldEntriesMetadata !== null) {

                        for (var intM = 0; intM < 100; intM++) {
                            // console.log(data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM]);
                            if (data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM] !== undefined) {
                                flexfieldsJSONData.push(data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM].Name);
                            }
                        }
                        for (var intM = 0; intM < 10; intM++) {
                            if (data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM] !== undefined) {
                                // columns.push({ data: data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM].Name, title: data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM].Name });
                            }
                        }
                    }
                }
            }
            // console.log(columns, ' - Columns');
            var targetValue1 = 0;
            var targetValue2 = 0;
            var targetValue3 = 0;
            var targetValue4 = 0;
            var targetValue5 = 0;
            var targetValue6 = 0;
            var targetValue7 = 0;
            var targetValue8 = 0;
            var targetValue9 = 0;
            var targetValue10 = 0;
            var targetFlag1 = false;
            var targetFlag2 = false;
            var targetFlag3 = false;
            var targetFlag4 = false;
            var targetFlag5 = false;
            var targetFlag6 = false;
            var targetFlag7 = false;
            var targetFlag8 = false;
            var targetFlag9 = false;
            var targetFlag10 = false;
            var flexValue;
            if (data.EntryMetadataLists !== null) {
                if (data.EntryMetadataLists.length > 0) {
                    if (data.EntryMetadataLists[0].FlexFieldEntriesMetadata !== null) {
                        var targetValue = checkValues.length;
                        // flexValue = data.EntryMetadataLists[0].FlexFieldEntriesMetadata.length;
                        flexValue = checkFlexValues.length;
                        if (flexValue > 10) {
                            flexValue = 10;
                        }
                        if (flexValue === 1) {
                            targetFlag1 = true;
                            targetValue1 = targetValue;
                        }
                        if (flexValue === 2) {
                            targetFlag1 = true;
                            targetFlag2 = true;
                            targetValue1 = targetValue;
                            targetValue2 = targetValue + 1;
                        }
                        if (flexValue === 3) {
                            targetFlag1 = true;
                            targetFlag2 = true;
                            targetFlag3 = true;
                            targetValue1 = targetValue;
                            targetValue2 = targetValue + 1;
                            targetValue3 = targetValue + 2;
                        }
                        if (flexValue === 4) {
                            targetFlag1 = true;
                            targetFlag2 = true;
                            targetFlag3 = true;
                            targetFlag4 = true;
                            targetValue1 = targetValue;
                            targetValue2 = targetValue + 1;
                            targetValue3 = targetValue + 2;
                            targetValue4 = targetValue + 3;
                        }
                        if (flexValue === 5) {
                            targetFlag1 = true;
                            targetFlag2 = true;
                            targetFlag3 = true;
                            targetFlag4 = true;
                            targetFlag5 = true;
                            targetValue1 = targetValue;
                            targetValue2 = targetValue + 1;
                            targetValue3 = targetValue + 2;
                            targetValue4 = targetValue + 3;
                            targetValue5 = targetValue + 4;
                        }
                        if (flexValue === 6) {
                            targetFlag1 = true;
                            targetFlag2 = true;
                            targetFlag3 = true;
                            targetFlag4 = true;
                            targetFlag5 = true;
                            targetFlag6 = true;
                            targetValue1 = targetValue;
                            targetValue2 = targetValue + 1;
                            targetValue3 = targetValue + 2;
                            targetValue4 = targetValue + 3;
                            targetValue5 = targetValue + 4;
                            targetValue6 = targetValue + 5;
                        }
                        if (flexValue === 7) {
                            targetFlag1 = true;
                            targetFlag2 = true;
                            targetFlag3 = true;
                            targetFlag4 = true;
                            targetFlag5 = true;
                            targetFlag6 = true;
                            targetFlag7 = true;
                            targetValue1 = targetValue;
                            targetValue2 = targetValue + 1;
                            targetValue3 = targetValue + 2;
                            targetValue4 = targetValue + 3;
                            targetValue5 = targetValue + 4;
                            targetValue6 = targetValue + 5;
                            targetValue7 = targetValue + 6;
                        }
                        if (flexValue === 8) {
                            targetFlag1 = true;
                            targetFlag2 = true;
                            targetFlag3 = true;
                            targetFlag4 = true;
                            targetFlag5 = true;
                            targetFlag6 = true;
                            targetFlag7 = true;
                            targetFlag8 = true;
                            targetValue1 = targetValue;
                            targetValue2 = targetValue + 1;
                            targetValue3 = targetValue + 2;
                            targetValue4 = targetValue + 3;
                            targetValue5 = targetValue + 4;
                            targetValue6 = targetValue + 5;
                            targetValue7 = targetValue + 6;
                            targetValue8 = targetValue + 7;
                        }
                        if (flexValue === 9) {
                            targetFlag1 = true;
                            targetFlag2 = true;
                            targetFlag3 = true;
                            targetFlag4 = true;
                            targetFlag5 = true;
                            targetFlag6 = true;
                            targetFlag7 = true;
                            targetFlag8 = true;
                            targetFlag9 = true;
                            targetValue1 = targetValue;
                            targetValue2 = targetValue + 1;
                            targetValue3 = targetValue + 2;
                            targetValue4 = targetValue + 3;
                            targetValue5 = targetValue + 4;
                            targetValue6 = targetValue + 5;
                            targetValue7 = targetValue + 6;
                            targetValue8 = targetValue + 7;
                            targetValue9 = targetValue + 8;
                        }
                        if (flexValue === 10) {
                            targetFlag1 = true;
                            targetFlag2 = true;
                            targetFlag3 = true;
                            targetFlag4 = true;
                            targetFlag5 = true;
                            targetFlag6 = true;
                            targetFlag7 = true;
                            targetFlag8 = true;
                            targetFlag9 = true;
                            targetFlag10 = true;
                            targetValue1 = targetValue;
                            targetValue2 = targetValue + 1;
                            targetValue3 = targetValue + 2;
                            targetValue4 = targetValue + 3;
                            targetValue5 = targetValue + 4;
                            targetValue6 = targetValue + 5;
                            targetValue7 = targetValue + 6;
                            targetValue8 = targetValue + 7;
                            targetValue9 = targetValue + 8;
                            targetValue10 = targetValue + 9;
                        }
                    }
                }
            }
            for (var i = 0; i <= columns.length - 1; i++) {
                if (columns[i].data === 'ETD') {
                    columnETD = i;
                }
            }
            for (var p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'ETA') {
                    columnETA = p;
                }
            }
            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'IsDocumentPresent') {
                    IsDocumentPresent = p;
                }
            }
            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'Customer') {
                    Customer = p;
                }
            }
            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'DocumentStatus') {
                    DocumentStatus = p;
                }
            }
            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'PortOfEntryDate') {
                    PortOfEntryDate = p;
                }
            }
            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'InsertedTime') {
                    InsertedTime = p;
                }
            }
            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'UpdatedTime') {
                    UpdatedTime = p;
                }
            }

            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'IsActive') {
                    IsActive = p;
                }
            }
            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'EntryMetaDataID') {
                    EntryMetaDataID = p;
                }
            }
            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'Level') {
                    Level = p;
                }
            }
            for (p = 0; p <= columns.length - 1; p++) {
                if (columns[p].data === 'RadioButton') {
                    RadioButton = p;
                }
            }
            if ($.fn.DataTable.isDataTable('#filterDataTable')) {
                $('#filterDataTable').DataTable().destroy();
                $('#filterDataTable').html('');
            }
            if (checkValues.length > 0) {
                $('#filterDataTable').DataTable({
                    data: data.EntryMetadataLists,
                    columns: columns,
                    searching: false, info: false, ordering: true,
                    pageLength: currPageSize,
                    scrollY: '50vh',
                    scrollCollapse: true,
                    /*iDisplayLength: tableDisplayRowCount,*/
                    stateSave: true,
                    'columnDefs': [
                        {
                            'targets': RadioButton,
                            'orderable': false,
                            'render': function (data, type, row, meta) {
                                var rowData = row.RadioButton;
                                var dataChx;
                                if (rowData === null) {
                                    dataChx = '<input type="radio" name = "radOperations" value="' + row.EntryMetaDataID + '"/> ';
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            }
                        }, {
                            'targets': IsDocumentPresent,
                            'render': function (data, type, row, meta) {
                                var rowData = row.IsDocumentPresent;
                                var datax;
                                if (rowData === true) {
                                    datax = '&nbsp; &nbsp; <a href="javascript:void(0);" class="btn btn-secondary btn-sm active" onclick="linkDocumentsClick(\'' + row.EntryMetaDataID + '\');"> &nbsp; Y</a>';

                                } else {
                                    datax = '<span  style="margin-left:23px;" >N</span>';
                                }
                                return datax;
                            }
                        }, {
                            'targets': Customer,
                            'render': function (data, type, row, meta) {
                                var rowData = row.Customer;
                                var datax;
                                datax = '&nbsp; &nbsp; <a href="javascript:void(0);" class="btn btn-secondary btn-sm active" onclick="linkCustomerDetailsClick(\'' + row.EntryMetaDataID + '\');"> ' + rowData + '</a>';
                                return datax;
                            }
                        }, {
                            'targets': DocumentStatus,
                            'render': function (data, type, row, meta) {
                                var rowData = row.DocumentStatus;
                                var docStat;
                                if (rowData !== null) {
                                    if (row.Level === 'Warning') {
                                        docStat = '<div class="shipmentWarning" style="padding:9px; text-align:center;">' + rowData + '</div>';
                                    }
                                    if (row.Level === 'Critical') {
                                        docStat = '<div class="shipmentCritical" style="padding:9px; text-align:center;">' + rowData + '</div>';
                                    }
                                    if (row.Level === 'Normal') {
                                        docStat = '<div class="shipmentClear" style="padding:9px; text-align:center;">' + rowData + '</div>';
                                    }
                                } else {
                                    docStat = '';
                                }
                                return docStat;
                            }
                        }, {
                            "render": function (data, type, row) {
                                var date = row.ETD;
                                if (data !== null) {
                                    var nowDate = new Date(parseInt(date.substr(6)));
                                    var mon = nowDate.getMonth() + 1;
                                    var dat = nowDate.getDate();
                                    return nowDate === 'ETD' ? '' : nowDate.getFullYear() + '-' + (mon < 10 ? "0" + mon : mon) + '-' + (dat < 10 ? "0" + dat : dat);
                                } else {
                                    return '';
                                }
                            },
                            "targets": columnETD
                        }, {
                            "render": function (data, type, row) {
                                var date = row.ETA;

                                if (date !== null) {
                                    var nowDate = new Date(parseInt(date.substr(6)));
                                    var mon = nowDate.getMonth() + 1;
                                    var dat = nowDate.getDate();
                                    return nowDate === 'ETA' ? '' : nowDate.getFullYear() + '-' + (mon < 10 ? "0" + mon : mon) + '-' + (dat < 10 ? "0" + dat : dat);
                                } else {
                                    return '';
                                }
                            },
                            "targets": columnETA
                        }, {
                            "render": function (data, type, row) {
                                var date = row.PortOfEntryDate;

                                if (date !== null) {
                                    var nowDate = new Date(parseInt(date.substr(6)));
                                    var mon = nowDate.getMonth() + 1;
                                    var dat = nowDate.getDate();
                                    return nowDate === 'PortOfEntryDate' ? '' : nowDate.getFullYear() + '-' + (mon < 10 ? "0" + mon : mon) + '-' + (dat < 10 ? "0" + dat : dat);
                                } else {
                                    return '';
                                }
                            },
                            "targets": PortOfEntryDate
                        }, {
                            "render": function (data, type, row) {
                                var date = row.InsertedTime;

                                if (date !== null) {
                                    var nowDate = new Date(parseInt(date.substr(6)));
                                    var utcDate = nowDate.toUTCString();
                                    return nowDate === 'InsertedTime' ? '' : utcformat(utcDate);
                                } else {
                                    return '';
                                }
                            },
                            "targets": InsertedTime
                        },

                        {
                            "render": function (data, type, row) {
                                var date = row.UpdatedTime;

                                if (date !== null) {
                                    var nowDate = new Date(parseInt(date.substr(6)));
                                    var utcDate = nowDate.toUTCString();
                                    return nowDate === 'UpdatedTime' ? '' : utcformat(utcDate);
                                } else {
                                    return '';
                                }
                            },
                            "targets": UpdatedTime
                        }, {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 1) {
                                    var currID = checkFlexIds[0];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue1
                        },
                        {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 2) {
                                    var currID = checkFlexIds[1];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue2
                        },
                        {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 3) {
                                    var currID = checkFlexIds[2];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue3
                        },
                        {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 4) {
                                    var currID = checkFlexIds[3];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue4
                        },
                        {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 5) {
                                    var currID = checkFlexIds[4];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue5
                        }, {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 6) {
                                    var currID = checkFlexIds[5];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue6
                        },
                        {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 7) {
                                    var currID = checkFlexIds[6];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue7
                        },
                        {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 8) {
                                    var currID = checkFlexIds[7];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue8
                        },
                        {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 9) {
                                    var currID = checkFlexIds[8];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue9
                        },
                        {
                            "render": function (data, type, row) {
                                var flexData = row.FlexFieldEntriesMetadata;
                                var dataChx;
                                if (flexData !== null && flexData.length >= 10) {
                                    var currID = checkFlexIds[9];
                                    dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                } else {
                                    dataChx = '';
                                }
                                return dataChx;
                            },
                            "targets": targetValue10
                        },
                        {
                            "targets": IsActive,
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": EntryMetaDataID,
                            "visible": false,
                            "searchable": false
                        },
                        {
                            "targets": Level,
                            "visible": false,
                            "searchable": false
                        }
                    ]
                });
                var pageLength = Math.ceil(totalRecords / currPageSize);
                var pagingHTML = '<button type="button" id="prevButton" class="btn btn-default" style="padding: 2px 120px;" onclick="getHomePrevious();">Previous</button> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Page <input id="pageInputNumber" type="number" value="1" step="1" min="1" max="' + pageLength + '" onkeypress="validateRowCountInput(event,' + pageLength + ');"> &nbsp; of ' + pageLength + ' &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Show &nbsp;&nbsp;&nbsp;';
                pagingHTML = pagingHTML + '<select id="entriesSelect"><option>10</option><option>25</option><option>50</option><option>100</option></select>&nbsp;&nbsp;&nbsp;entries&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                pagingHTML = pagingHTML + '<button type="button" id="nextButton" class="btn btn-default" style="padding: 2px 120px;" onclick="getHomeNext();">Next</button>';
                $("#filterDataTable_paginate").html(pagingHTML);
                $("#dataTables_length").hide();
                $('#filterDataTable').on('draw.dt', function () {//Remove sort class on all redraw
                    $("#filterDataTable td").removeClass("sorting_1");
                });
                $('#pageInputNumber').attr('value', currPageNumber);
                $('#pageInputNumber').bind('focusout', function (e) {
                    if ($('#pageInputNumber').val() > pageLength || $('#pageInputNumber').val() === 0) {
                        currPageNumber = pageLength;
                        $(this).attr('value', pageLength);
                    } else {
                        currPageNumber = $('#pageInputNumber').val();
                        $(this).attr('value', currPageNumber);
                        getHomeData();
                    }

                });
                if (currPageNumber === 1) {
                    $("#prevButton").attr('disabled', 'disabled');
                } else {
                    $("#prevButton").removeAttr('disabled');
                }
                if (currPageNumber >= pageLength || pageLength === 0) {
                    $("#nextButton").attr('disabled', 'disabled');
                } else {
                    $("#nextButton").removeAttr('disabled');
                }
                $('#pageInputNumber').keypress(function (event) {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if (keycode == '13') {
                        if ($('#pageInputNumber').val() <= pageLength || $('#pageInputNumber').val() !== 0) {
                            currPageNumber = $('#pageInputNumber').val();
                            $(this).attr('value', currPageNumber);
                            getHomeData();
                        } else {
                            $('#pageInputNumber').attr('value', pageLength);
                        }
                    }
                });
                $('#entriesSelect').val(currPageSize);
                $('#entriesSelect').change(function () {
                    currPageSize = $("#entriesSelect option:selected").val();
                    currPageNumber = 1;
                    getHomeData();
                });
                $('#filterDataTable').on('draw.dt', function () {//Remove sort class on all redraw
                    $("#filterDataTable td").removeClass("sorting_1");
                });
                $("#filterDataTable td").removeClass("sorting_1");
                $("#filterDataTable tr").click(function () {
                    var selected = $(this).hasClass("highlight");
                    $("#filterDataTable tr").removeClass("highlight");
                    if (!selected)
                        $(this).addClass("highlight");
                });
            }
            paramsData = '';
            sessionStorage.clear();
            $('#ajax_loader').hide();
            modal.dialog('close');
        },
        error: function (xhr) {
            //alert('error');
            $('#ajax_loader').hide();
            modal.dialog('close');
        },
        complete: function () {
            //back to normal!
            $('#ajax_loader').hide();
            modal.dialog('close');
        }
    });

}
function changePage(currentPageId) {
    currPageNumber = currentPageId;
    getData();
}
function getSearchData() {
    var currSelection = $("#searchOptions option:selected").val();
    if (currSelection !== 'sel') {
        $("#flexDom").html('');
        $("#saveSearchCriteria").html('');
        $('#searchContainer').html('');
        var flexDom = '';
        searchFlag = true;
        currSearchJSONData = saveSearchData[currSelection].SaveSearchParams;
        flexDomSelectedSearch = JSON.parse(saveSearchData[currSelection].SaveSearchFlexFields);
        var saveSearchCriteriaDOM = JSON.parse(saveSearchData[currSelection].SaveSearchParams);
        currentColumn = saveSearchCriteriaDOM;
        // console.log(currSearchJSONData, ' - NON Flex Fields');
        for (var searchC = 0; searchC < saveSearchCriteriaDOM.length; searchC++) {
            addSearchRow(searchC);
        }
        setTimeout(function () {
            for (var i = 0; i < currentColumn.length; i++) {
                $('#columnList' + (i + 1) + ' option[value="' + currentColumn[i].ColumnName + '"]').attr('selected', true);
                // console.log(currentColumn[i].ColumnName);
                if (currentColumn[i].ColumnName === 'Country') {              
                    if (currentColumn[i].Operator === 'Equal') {
                        $('#operator' + (i + 1)).html('<option value="Equal" selected>Equals</option><option value="NotEqual">Not Equal</option>');
                    } else {
                        $('#operator' + (i + 1)).html('<option value="Equal">Equals</option><option value="NotEqual" selected>Not Equal</option>');
                    }                        
                } else if (currentColumn[i].ColumnName === 'Customer' || currentColumn[i].ColumnName === 'MasterBill' || currentColumn[i].ColumnName === 'HouseBill' || currentColumn[i].ColumnName === 'EntryNumber' || currentColumn[i].ColumnName === 'PortOfOriginName' ||
                    currentColumn[i].ColumnName === 'SalesProgram' || currentColumn[i].ColumnName === 'DocumentStatus' || currentColumn[i].ColumnName === 'MessageType' || currentColumn[i].ColumnName === 'EntryType' || currentColumn[i].ColumnName === 'ModeOfTrans' ||
                    currentColumn[i].ColumnName === 'CountryOfOrig' || currentColumn[i].ColumnName === 'PortOfOriginName' || currentColumn[i].ColumnName === 'PortOfDestName' || currentColumn[i].ColumnName === 'PortOfEntryName' || currentColumn[i].ColumnName === 'VesselName' ||
                    currentColumn[i].ColumnName === 'Voyage' || currentColumn[i].ColumnName === 'Containers' || currentColumn[i].ColumnName === 'CustRef' || currentColumn[i].ColumnName === 'BrokerName' || currentColumn[i].ColumnName === 'BrokerCode' || currentColumn[i].ColumnName === 'InsertedBy' ||
                    currentColumn[i].ColumnName === 'UpdatedBy' || currentColumn[i].ColumnName === 'Source') {
                    // console.log(currentColumn[i].Operator);
                    if (currentColumn[i].Operator === 'Equal') {
                        $('#operator' + (i + 1)).html('<option value="Equal" selected>Equals</option><option value="NotEqual">Not Equal</option><option value="Contains">Contains</option><option value="NotContains">Not Contains</option><option value="StartsWith">Starts With</option><option value="EndsWith">Ends With</option><option value="In_">In</option><option value="NotIn">Not In</option>');
                    } else if (currentColumn[i].Operator === 'Contains') {
                        $('#operator' + (i + 1)).html('<option value="Equal">Equals</option><option value="NotEqual">Not Equal</option><option value="Contains" selected>Contains</option><option value="NotContains">Not Contains</option><option value="StartsWith">Starts With</option><option value="EndsWith">Ends With</option><option value="In_">In</option><option value="NotIn">Not In</option>');
                    } else if (currentColumn[i].Operator === 'NotContains') {
                        $('#operator' + (i + 1)).html('<option value="Equal">Equals</option><option value="NotEqual">Not Equal</option><option value="Contains">Contains</option><option value="NotContains" selected>Not Contains</option><option value="StartsWith">Starts With</option><option value="EndsWith">Ends With</option><option value="In_">In</option><option value="NotIn">Not In</option>');
                    } else if (currentColumn[i].Operator === 'NotEqual') {
                        $('#operator' + (i + 1)).html('<option value="Equal">Equals</option><option value="NotEqual" selected>Not Equal</option><option value="Contains">Contains</option><option value="NotContains">Not Contains</option><option value="StartsWith">Starts With</option><option value="EndsWith">Ends With</option><option value="In_">In</option><option value="NotIn">Not In</option>');
                    } else if (currentColumn[i].Operator === 'EndsWith') {
                        $('#operator' + (i + 1)).html('<option value="Equal">Equals</option><option value="NotEqual">Not Equal</option><option value="Contains">Contains</option><option value="NotContains">Not Contains</option><option value="StartsWith">Starts With</option><option value="EndsWith" selected>Ends With</option><option value="In_">In</option><option value="NotIn">Not In</option>');
                    } else if (currentColumn[i].Operator === 'StartsWith') {
                        $('#operator' + (i + 1)).html('<option value="Equal">Equals</option><option value="NotEqual">Not Equal</option><option value="Contains">Contains</option><option value="NotContains">Not Contains</option><option value="StartsWith" selected>Starts With</option><option value="EndsWith">Ends With</option><option value="In_">In</option><option value="NotIn">Not In</option>');
                    } else if (currentColumn[i].Operator === 'In_') {
                        $('#operator' + (i + 1)).html('<option value="Equal">Equals</option><option value="NotEqual">Not Equal</option><option value="Contains">Contains</option><option value="NotContains">Not Contains</option><option value="StartsWith">Starts With</option><option value="EndsWith">Ends With</option><option value="In_" selected>In</option><option value="NotIn">Not In</option>');
                    } else {
                        $('#operator' + (i + 1) + ' option[value="' + currentColumn[i].Operator + '"]').attr('selected', true);
                    }
                } else {
                    $('#operator' + (i + 1) + ' option[value="' + currentColumn[i].Operator + '"]').attr('selected', true);
                }
                if (currentColumn[i].ColumnName !== 'IsDocumentPresent') {
                    if (currentColumn[i].ColumnName === 'Country') {
                        getCountriesFromSearch(i + 1, currentColumn[i].Value1);                   
                     } else {
                        $('#valueList' + (i + 1)).html('<input type="text" class="form-control" value="' + currentColumn[i].Value1 + '">');
                    } 
                } else {
                    if (currentColumn[i].Value1 === '1') {
                        $('#valueList' + (i + 1)).html('<select class="form-control"><option value="">Please select</option><option value="1" selected>True</option><option value="0">False</option></select>');
                    } else {
                        $('#valueList' + (i + 1)).html('<select class="form-control"><option value="">Please select</option><option value="1">True</option><option value="0" selected>False</option></select>');
                    }
                }
            }

        }, 5000);
        $("#flexDom").html(flexDom);
        currPageSize = saveSearchData[currSelection].SaveSearchRecordCount;
        currPageNumber = 1;
        getData();
    } else {
        getData();
    }
}
function getData(params) {
    var jsonData = [];
    var totalRecords = 0;
    tableDisplayRowCount = 10;
    var sortColumn = "";
    var sortType = "DESC";
    if (searchFlag === false) {
        if (sessionStorage.length === 0 || sessionStorage.getItem('currPageNumber') === 'undefined') {
            jsonData = GetParameterValues(params);
            localStorage.setItem("jsonData", jsonData);
        } else {
            if (paramsData !== '') {
                jsonData = paramsData;
            } else {
                jsonData = localStorage.getItem("jsonData");
            }

            var currentpageURL = getCurrentURL();
            if (currentpageURL === localStorage.getItem('lastURL')) {
                $('#searchContainer').html(sessionHTMLData);
            }
            currPageNumber = sessionStorage.getItem('currPageNumber');
            currPageSize = sessionStorage.getItem('currPageSize');
        }
    } else {
        jsonData = currSearchJSONData;
    }
    var res = getCurrentURL();
    localStorage.setItem("lastURL", res);
    var ajaxUrl = '';
    if (res === 'ListCountry') {
        ajaxUrl = 'GetCountriesByAjax';
        sortColumn = "CountryName";
    } else if (res === 'ListUniversalPort') {
        ajaxUrl = 'GetUniversalPortsByAjax ';
        sortColumn = "PortCode";
    } else if (res === 'ListEntryType') {
        ajaxUrl = 'GetEntryTypesByAjax';
        sortColumn = "EntryType1";
    } else if (res === 'ListSalesProgram') {
        ajaxUrl = 'GetSalesByAjax  ';
        sortColumn = "SalesProgramName";
    } else if (res === 'ListSource') {
        ajaxUrl = 'GetSourcesByAjax  ';
        sortColumn = "SourceCode";
    } else if (res === 'ListStatus') {
        ajaxUrl = 'GetStatusesByAjax   ';
        sortColumn = "Status1";
    } else if (res === 'ListCustomerCode') {
        ajaxUrl = 'GetCustomerCodeByAjax  ';
        sortColumn = "CustomerCode1";
    }
    else if (res === 'ListFlexField') {
        ajaxUrl = 'GetFlexFieldByAjax  ';
        sortColumn = "FlexFieldName";
    } else if (res === 'ListBroker') {
        ajaxUrl = 'GetBrokerByAjax  ';
        sortColumn = "BrokerCode";
    } else {
        ajaxUrl = 'GetShipmentsByAjax';
        if (sortColumnName === '') {
            sortColumn = "EntryMetaDataID";
        } else {
            sortColumn = sortColumnName;
        }
    }
    var modal = $('<div>').dialog({ modal: true });
    modal.dialog('widget').hide();
    $('#ajax_loader').show();
    if (currPageSize === 'undefined') {
        currPageSize = 10;
    }
    if (currPageNumber === 'undefined') {
        currPageNumber = 1;
    }
    $.ajax({
        url: '/' + res + '/' + ajaxUrl,
        data: { JsonData: jsonData, pageSize: currPageSize, pageNumber: currPageNumber, sortColumn: sortColumn, sortType: sortColumnOrder },
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            //temp fix
            if (data.TotalRecordCount === undefined) {
                data.TotalRecordCount = data.length;
            }
            $('#totalRecords').html(data.TotalRecordCount);
            totalRecords = data.TotalRecordCount;
            var tableDisplaySessionRowCount = sessionStorage.getItem("filterLength");
            if (tableDisplaySessionRowCount === null) {
                tableDisplayRowCount = $("[name=filterDataTable_length]").val();
                if (typeof tableDisplayRowCount === 'undefined') {
                    tableDisplayRowCount = 10;
                }
            } else {
                tableDisplayRowCount = tableDisplaySessionRowCount;
            }
            var columns = [];
            var checkValues = $('input[class=columnCheckBox]:checked').map(function () {
                return $(this).val();
            }).get();
            var checkTexts = $('input[class=columnCheckBox]:checked').map(function () {
                return $(this).attr("alt");
            }).get();
            if (checkValues.length > 0) {
                checkValues.unshift("RadioButton");
                checkTexts.unshift("");
            }          
            if (res === 'Home') {
                tableDisplaySessionRowCount = sessionStorage.getItem("filterLength");
                if (tableDisplaySessionRowCount === null) {
                    tableDisplayRowCount = $("[name=filterDataTable_length]").val();
                    if (typeof tableDisplayRowCount === 'undefined') {
                        tableDisplayRowCount = 10;
                    }
                } else {
                    tableDisplayRowCount = tableDisplaySessionRowCount;
                }
                columns = [];
                checkValues = $('input[class=columnCheckBox]:checked').map(function () {
                    if ($(this).attr('name') !== 'flexCheck') {
                        return $(this).val();
                    }
                    // return $(this).val();
                }).get();
                checkTexts = $('input[class=columnCheckBox]:checked').map(function () {
                    if ($(this).attr('name') !== 'flexCheck') {
                        return $(this).attr("alt");
                    }
                }).get();
                var checkFlexValues = $('input[class=columnCheckBox]:checked').map(function () {
                    if ($(this).attr('name') === 'flexCheck') {
                        return $(this).attr("alt");
                    }

                }).get();
                var checkFlexIds = $('input[class=columnCheckBox]:checked').map(function () {
                    if ($(this).attr('name') === 'flexCheck') {
                        return $(this).attr("id").substr(9);
                    }

                }).get();
                if (checkValues.length > 0) {
                    checkValues.unshift("RadioButton");
                    checkTexts.unshift("");
                }
                if (checkValues.length > 0) {
                    for (var k = 0; k <= checkValues.length - 1; k++) {
                        columns.push({ data: checkValues[k], title: checkTexts[k] });
                    }
                    for (var l = 0; l <= checkFlexValues.length - 1; l++) {
                        columns.push({ data: checkFlexValues[l], title: checkFlexValues[l] });
                    }
                    flexfieldsJSONData = [];
                    if (data.EntryMetadataLists !== null) {
                        if (data.EntryMetadataLists.length > 0) {
                            if (data.EntryMetadataLists[0].FlexFieldEntriesMetadata !== null) {
                                
                                for (var intM = 0; intM < 100; intM++) {
                                    // console.log(data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM]);
                                    if (data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM] !== undefined) {
                                        flexfieldsJSONData.push(data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM].Name);
                                    }
                                }
                                for (var intM = 0; intM < 5; intM++) {
                                    if (data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM] !== undefined) {
                                       // columns.push({ data: data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM].Name, title: data.EntryMetadataLists[0].FlexFieldEntriesMetadata[intM].Name });
                                    }
                                }
                            }
                        }
                    }
                }
               
                
                var flexDomSearch = flexfieldsJSONData; 
                if ($("input[name=flexCheck]").first().attr("alt") !== flexDomSearch[0]) {
                    $("#flexDom").html('');
                    var checkFlexIds = [];
                    // console.log(flexDomSearch, ' - flexDomSearch getData -- ', flexDomSelectedSearch)
                    var flexDom = '';
                    for (var drp = 0; drp < flexDomSearch.length; drp++) {
                        flexDom = flexDom + '<div class="col-md-2"><div class="checkbox"><label><input type="checkbox" name="flexCheck" onclick="flexClick();" class="columnCheckBox" alt="' + flexDomSearch[drp] + '" id="flexCheck' + drp + '"  value="flexCheck' + drp + '">' + flexDomSearch[drp] + '</label></div></div>';
                    }
                    if (flexDomSearch.length === 0) {
                        $("#flexDom").html('<p>No Flexfields to display</p>');
                    } else {
                        $("#flexDom").html(flexDom);
                        for (var flexChk = 0; flexChk < flexDomSelectedSearch.length; flexChk++) {
                            $('#' + flexDomSelectedSearch[flexChk]).prop('checked', true);
                        }
                        var checkFlexValues = $('input[class=columnCheckBox]:checked').map(function () {
                            if ($(this).attr('name') === 'flexCheck') {
                                return $(this).attr("alt");
                            }

                        }).get();
                        if (checkFlexValues === undefined) {
                            checkFlexValues = [];
                        }
                        for (var l = 0; l <= checkFlexValues.length - 1; l++) {
                            columns.push({ data: checkFlexValues[l], title: checkFlexValues[l] });
                        }
                        checkFlexIds = $('input[class=columnCheckBox]:checked').map(function () {
                            if ($(this).attr('name') === 'flexCheck') {
                                return $(this).attr("id").substr(9);
                            }

                        }).get();
                    }
                }
            }
            else if (res === 'ListCountry') {
                if (data.length !== 0) {
                    var columnNames = Object.keys(data[0]);
                    var columnNamesTitle = Object.keys(data[0]);
                    for (var i in columnNames) {
                        if (columnNamesTitle[i] === 'CountryName') {
                            columnNamesTitle[i] = 'Country Code';
                        }
                        if (columnNamesTitle[i] === 'CountryNiceName') {
                            columnNamesTitle[i] = 'Country Name';
                        }
                        if (columnNamesTitle[i] === 'CountryEmail') {
                            columnNamesTitle[i] = 'Country Email';
                        }
                        if (columnNamesTitle[i] === 'CountryId') {
                            columnNamesTitle[i] = '';
                        }
                        if (columnNamesTitle[i] === 'InsertedBy') {
                            columnNamesTitle[i] = 'Inserted By';
                        }
                        if (columnNamesTitle[i] === 'InsertedTime') {
                            columnNamesTitle[i] = 'Inserted Time';
                        }
                        if (columnNamesTitle[i] === 'UpdatedBy') {
                            columnNamesTitle[i] = 'Updated By';
                        }
                        if (columnNamesTitle[i] === 'UpdatedTime') {
                            columnNamesTitle[i] = 'Updated Time';
                        }
                        columns.push({ data: columnNames[i], title: columnNamesTitle[i] });
                    }
                }
            }
            else if (res === 'ListEntryType') {
                if (data.length !== 0) {
                    var columnNamesEntity = Object.keys(data[0]);
                    var columnNamesEntityTitle = Object.keys(data[0]);
                    for (var p in columnNamesEntity) {
                        if (columnNamesEntityTitle[p] === 'EntryTypeId') {
                            columnNamesEntityTitle[p] = '';
                        }
                        if (columnNamesEntityTitle[p] === 'EntryType1') {
                            columnNamesEntityTitle[p] = 'Entity Type';
                        }
                        if (columnNamesEntityTitle[p] === 'InsertedBy') {
                            columnNamesEntityTitle[p] = 'Inserted By';
                        }
                        if (columnNamesEntityTitle[p] === 'InsertedTime') {
                            columnNamesEntityTitle[p] = 'Inserted Time';
                        }
                        if (columnNamesEntityTitle[p] === 'UpdatedBy') {
                            columnNamesEntityTitle[p] = 'Updated By';
                        }
                        if (columnNamesEntityTitle[p] === 'UpdatedTime') {
                            columnNamesEntityTitle[p] = 'Updated Time';
                        }
                        columns.push({ data: columnNamesEntity[p], title: columnNamesEntityTitle[p] });
                    }
                }
            }
            else if (res === 'ListUniversalPort') {
                if (data.length !== 0) {
                    var columnNamesPort = Object.keys(data[0]);
                    var columnNamesPortTitle = Object.keys(data[0]);
                    for (var q in columnNamesPort) {
                        if (columnNamesPortTitle[q] === 'PortId') {
                            columnNamesPortTitle[q] = '';
                        }
                        if (columnNamesPortTitle[q] === 'PortCode') {
                            columnNamesPortTitle[q] = 'Port Code';
                        }
                        if (columnNamesPortTitle[q] === 'PortName') {
                            columnNamesPortTitle[q] = 'Port Name';
                        }
                        if (columnNamesPortTitle[q] === 'InsertedBy') {
                            columnNamesPortTitle[q] = 'Inserted By';
                        }
                        if (columnNamesPortTitle[q] === 'InsertedTime') {
                            columnNamesPortTitle[q] = 'Inserted Time';
                        }
                        if (columnNamesPortTitle[q] === 'UpdatedBy') {
                            columnNamesPortTitle[q] = 'Updated By';
                        }
                        if (columnNamesPortTitle[q] === 'UpdatedTime') {
                            columnNamesPortTitle[q] = 'Updated Time';
                        }
                        columns.push({ data: columnNamesPort[q], title: columnNamesPortTitle[q] });
                    }
                }
            }
            else if (res === 'ListSalesProgram') {
                if (data.length !== 0) {
                    var columnNamesSales = Object.keys(data[0]);
                    var columnNamesSalesTitle = Object.keys(data[0]);
                    for (var r in columnNamesSales) {
                        if (columnNamesSalesTitle[r] === 'SalesProgramId') {
                            columnNamesSalesTitle[r] = '';
                        }
                        if (columnNamesSalesTitle[r] === 'SalesProgramName') {
                            columnNamesSalesTitle[r] = 'Sales Program';
                        }
                        if (columnNamesSalesTitle[r] === 'InsertedBy') {
                            columnNamesSalesTitle[r] = 'Inserted By';
                        }
                        if (columnNamesSalesTitle[r] === 'InsertedTime') {
                            columnNamesSalesTitle[r] = 'Inserted Time';
                        }
                        if (columnNamesSalesTitle[r] === 'UpdatedBy') {
                            columnNamesSalesTitle[r] = 'Updated By';
                        }
                        if (columnNamesSalesTitle[r] === 'UpdatedTime') {
                            columnNamesSalesTitle[r] = 'Updated Time';
                        }
                        columns.push({ data: columnNamesSales[r], title: columnNamesSalesTitle[r] });
                    }
                }
            }
            else if (res === 'ListStatus') {
                if (data.length !== 0) {
                    var columnNamesStatus = Object.keys(data[0]);
                    var columnNamesStatusTitle = Object.keys(data[0]);
                    for (var s in columnNamesStatus) {
                        if (columnNamesStatusTitle[s] === 'StatusId') {
                            columnNamesStatusTitle[s] = '';
                        }
                        if (columnNamesStatusTitle[s] === 'Status1') {
                            columnNamesStatusTitle[s] = 'Status';
                        }
                        if (columnNamesStatusTitle[s] === 'CountryName') {
                            columnNamesStatusTitle[s] = 'Country';
                        }
                        if (columnNamesStatusTitle[s] === 'MaerskStatusName') {
                            columnNamesStatusTitle[s] = 'Maersk Status';
                        }
                        if (columnNamesStatusTitle[s] === 'IsNotification') {
                            columnNamesStatusTitle[s] = 'Notify';
                        }
                        if (columnNamesStatusTitle[s] === 'InsertedBy') {
                            columnNamesStatusTitle[s] = 'Inserted By';
                        }
                        if (columnNamesStatusTitle[s] === 'InsertedTime') {
                            columnNamesStatusTitle[s] = 'Inserted Time';
                        }
                        if (columnNamesStatusTitle[s] === 'UpdatedBy') {
                            columnNamesStatusTitle[s] = 'Updated By';
                        }
                        if (columnNamesStatusTitle[s] === 'UpdatedTime') {
                            columnNamesStatusTitle[s] = 'Updated Time';
                        }
                        columns.push({ data: columnNamesStatus[s], title: columnNamesStatusTitle[s] });
                    }
                }
            }
            else if (res === 'ListCustomerCode') {
                if (data.length !== 0) {
                    var columnNamesCustomer = Object.keys(data[0]);
                    var columnNamesCustomerTitle = Object.keys(data[0]);
                    for (var t in columnNamesCustomer) {
                        if (columnNamesCustomerTitle[t] === 'CustomerCodeId') {
                            columnNamesCustomerTitle[t] = '';
                        }
                        if (columnNamesCustomerTitle[t] === 'IsDocumentPresent') {
                            columnNamesCustomerTitle[t] = 'Document';
                        }
                        if (columnNamesCustomerTitle[t] === 'CustomerCode1') {
                            columnNamesCustomerTitle[t] = 'Customer Code';
                        }
                        if (columnNamesCustomerTitle[t] === 'CustomerName') {
                            columnNamesCustomerTitle[t] = 'Customer Name';
                        }
                        if (columnNamesCustomerTitle[t] === 'MaerskCode') {
                            columnNamesCustomerTitle[t] = 'Maersk Code';
                        }
                        if (columnNamesCustomerTitle[t] === 'DamcoCode') {
                            columnNamesCustomerTitle[t] = 'Damco Code';
                        }
                        if (columnNamesCustomerTitle[t] === 'SalesProgramName') {
                            columnNamesCustomerTitle[t] = 'Sales Program';
                        }
                        if (columnNamesCustomerTitle[t] === 'CountryName') {
                            columnNamesCustomerTitle[t] = 'Country';
                        }
                        if (columnNamesCustomerTitle[t] === 'IsNotification') {
                            columnNamesCustomerTitle[t] = 'Notify';
                        }
                        if (columnNamesCustomerTitle[t] === 'IOP') {
                            columnNamesCustomerTitle[t] = 'IOP';
                        }
                        if (columnNamesCustomerTitle[t] === 'InsertedBy') {
                            columnNamesCustomerTitle[t] = 'Inserted By';
                        }
                        if (columnNamesCustomerTitle[t] === 'InsertedTime') {
                            columnNamesCustomerTitle[t] = 'Inserted Time';
                        }
                        if (columnNamesCustomerTitle[t] === 'UpdatedBy') {
                            columnNamesCustomerTitle[t] = 'Updated By';
                        }
                        if (columnNamesCustomerTitle[t] === 'UpdatedTime') {
                            columnNamesCustomerTitle[t] = 'Updated Time';
                        }
                        columns.push({ data: columnNamesCustomer[t], title: columnNamesCustomerTitle[t] });
                    }
                }
            }
            else if (res === 'ListFlexField') {
                if (data.length !== 0) {
                    var columnNamesFlexField = Object.keys(data[0]);
                    var columnNamesFlexFieldTitle = Object.keys(data[0]);
                    for (var u in columnNamesFlexField) {
                        if (columnNamesFlexFieldTitle[u] === 'Id') {
                            columnNamesFlexFieldTitle[u] = '';
                        }
                        if (columnNamesFlexFieldTitle[u] === 'Name') {
                            columnNamesFlexFieldTitle[u] = 'Name';
                        }
                        if (columnNamesFlexFieldTitle[u] === 'Type') {
                            columnNamesFlexFieldTitle[u] = 'Type';
                        }
                        if (columnNamesFlexFieldTitle[u] === 'CountryName') {
                            columnNamesFlexFieldTitle[u] = 'Country';
                        }
                        if (columnNamesFlexFieldTitle[u] === 'InsertedBy') {
                            columnNamesFlexFieldTitle[u] = 'Inserted By';
                        }
                        if (columnNamesFlexFieldTitle[u] === 'InsertedTime') {
                            columnNamesFlexFieldTitle[u] = 'Inserted Time';
                        }
                        if (columnNamesFlexFieldTitle[u] === 'UpdatedBy') {
                            columnNamesFlexFieldTitle[u] = 'Updated By';
                        }
                        if (columnNamesFlexFieldTitle[u] === 'UpdatedTime') {
                            columnNamesFlexFieldTitle[u] = 'Updated Time';
                        }
                        columns.push({ data: columnNamesFlexField[u], title: columnNamesFlexFieldTitle[u] });
                    }
                }
            }
            else if (res === 'ListSource') {
                if (data.length !== 0) {
                    var columnNamesSource = Object.keys(data[0]);
                    var columnNamesSourceTitle = Object.keys(data[0]);
                    for (var v in columnNamesSource) {
                        if (columnNamesSourceTitle[v] === 'SourceId') {
                            columnNamesSourceTitle[v] = '';
                        }
                        if (columnNamesSourceTitle[v] === 'SourceCode') {
                            columnNamesSourceTitle[v] = 'Source Code';
                        }
                        if (columnNamesSourceTitle[v] === 'SourceName') {
                            columnNamesSourceTitle[v] = 'Source Name';
                        }
                        if (columnNamesSourceTitle[v] === 'InsertedBy') {
                            columnNamesSourceTitle[v] = 'Inserted By';
                        }
                        if (columnNamesSourceTitle[v] === 'InsertedTime') {
                            columnNamesSourceTitle[v] = 'Inserted Time';
                        }
                        if (columnNamesSourceTitle[v] === 'UpdatedBy') {
                            columnNamesSourceTitle[v] = 'Updated By';
                        }
                        if (columnNamesSourceTitle[v] === 'UpdatedTime') {
                            columnNamesSourceTitle[v] = 'Updated Time';
                        }
                        columns.push({ data: columnNamesSource[v], title: columnNamesSourceTitle[v] });
                    }
                }
            }
            else if (res === 'ListBroker') {
                if (data.length !== 0) {
                    var columnNamesBroker = Object.keys(data[0]);
                    var columnNamesBrokerTitle = Object.keys(data[0]);
                    for (var w in columnNamesBroker) {
                        if (columnNamesBrokerTitle[w] === 'BrokerId') {
                            columnNamesBrokerTitle[w] = '';
                        }
                        if (columnNamesBrokerTitle[w] === 'BrokerCode') {
                            columnNamesBrokerTitle[w] = 'Broker Code';
                        }
                        if (columnNamesBrokerTitle[w] === 'BrokerName') {
                            columnNamesBrokerTitle[w] = 'Broker Name';
                        }
                        if (columnNamesBrokerTitle[w] === 'BrokerEmail') {
                            columnNamesBrokerTitle[w] = 'Broker Email';
                        }
                        if (columnNamesBrokerTitle[w] === 'InsertedBy') {
                            columnNamesBrokerTitle[w] = 'Inserted By';
                        }
                        if (columnNamesBrokerTitle[w] === 'InsertedTime') {
                            columnNamesBrokerTitle[w] = 'Inserted Time';
                        }
                        if (columnNamesBrokerTitle[w] === 'UpdatedBy') {
                            columnNamesBrokerTitle[w] = 'Updated By';
                        }
                        if (columnNamesBrokerTitle[w] === 'UpdatedTime') {
                            columnNamesBrokerTitle[w] = 'Updated Time';
                        }
                        columns.push({ data: columnNamesBroker[w], title: columnNamesBrokerTitle[w] });
                    }
                }
            }
            getColumnPosition(columns);

            if (res === 'Home') {
                if ($.fn.DataTable.isDataTable('#filterDataTable')) {
                    $('#filterDataTable').DataTable().destroy();
                    $('#filterDataTable').html('');
                    $.fn.dataTable.ext.errMode = 'none';  
                }
                var targetValue1 = 0;
                var targetValue2 = 0;
                var targetValue3 = 0;
                var targetValue4 = 0;
                var targetValue5 = 0;
                var targetValue6 = 0;
                var targetValue7 = 0;
                var targetValue8 = 0;
                var targetValue9 = 0;
                var targetValue10 = 0;
                var targetFlag1 = false;
                var targetFlag2 = false;
                var targetFlag3 = false;
                var targetFlag4 = false;
                var targetFlag5 = false;
                var targetFlag6 = false;
                var targetFlag7 = false;
                var targetFlag8 = false;
                var targetFlag9 = false;
                var targetFlag10 = false;
                var flexValue;
                if (data.EntryMetadataLists !== null) {
                    if (data.EntryMetadataLists.length > 0) {
                        if (data.EntryMetadataLists[0].FlexFieldEntriesMetadata !== null) {
                            var targetValue = checkValues.length;
                            // flexValue = data.EntryMetadataLists[0].FlexFieldEntriesMetadata.length;
                            if (checkFlexValues !== undefined) {
                                flexValue = checkFlexValues.length;
                            } else {
                                flexValue = 0
                            }
                            if (flexValue > 10) {
                                flexValue = 10;
                            }
                            if (flexValue === 1) {
                                targetFlag1 = true;
                                targetValue1 = targetValue;
                            }
                            if (flexValue === 2) {
                                targetFlag1 = true;
                                targetFlag2 = true;
                                targetValue1 = targetValue;
                                targetValue2 = targetValue + 1;
                            }
                            if (flexValue === 3) {
                                targetFlag1 = true;
                                targetFlag2 = true;
                                targetFlag3 = true;
                                targetValue1 = targetValue;
                                targetValue2 = targetValue + 1;
                                targetValue3 = targetValue + 2;
                            }
                            if (flexValue === 4) {
                                targetFlag1 = true;
                                targetFlag2 = true;
                                targetFlag3 = true;
                                targetFlag4 = true;
                                targetValue1 = targetValue;
                                targetValue2 = targetValue + 1;
                                targetValue3 = targetValue + 2;
                                targetValue4 = targetValue + 3;
                            }
                            if (flexValue === 5) {
                                targetFlag1 = true;
                                targetFlag2 = true;
                                targetFlag3 = true;
                                targetFlag4 = true;
                                targetFlag5 = true;
                                targetValue1 = targetValue;
                                targetValue2 = targetValue + 1;
                                targetValue3 = targetValue + 2;
                                targetValue4 = targetValue + 3;
                                targetValue5 = targetValue + 4;
                            }
                            if (flexValue === 6) {
                                targetFlag1 = true;
                                targetFlag2 = true;
                                targetFlag3 = true;
                                targetFlag4 = true;
                                targetFlag5 = true;
                                targetFlag6 = true;
                                targetValue1 = targetValue;
                                targetValue2 = targetValue + 1;
                                targetValue3 = targetValue + 2;
                                targetValue4 = targetValue + 3;
                                targetValue5 = targetValue + 4;
                                targetValue6 = targetValue + 5;
                            }
                            if (flexValue === 7) {
                                targetFlag1 = true;
                                targetFlag2 = true;
                                targetFlag3 = true;
                                targetFlag4 = true;
                                targetFlag5 = true;
                                targetFlag6 = true;
                                targetFlag7 = true;
                                targetValue1 = targetValue;
                                targetValue2 = targetValue + 1;
                                targetValue3 = targetValue + 2;
                                targetValue4 = targetValue + 3;
                                targetValue5 = targetValue + 4;
                                targetValue6 = targetValue + 5;
                                targetValue7 = targetValue + 6;
                            }
                            if (flexValue === 8) {
                                targetFlag1 = true;
                                targetFlag2 = true;
                                targetFlag3 = true;
                                targetFlag4 = true;
                                targetFlag5 = true;
                                targetFlag6 = true;
                                targetFlag7 = true;
                                targetFlag8 = true;
                                targetValue1 = targetValue;
                                targetValue2 = targetValue + 1;
                                targetValue3 = targetValue + 2;
                                targetValue4 = targetValue + 3;
                                targetValue5 = targetValue + 4;
                                targetValue6 = targetValue + 5;
                                targetValue7 = targetValue + 6;
                                targetValue8 = targetValue + 7;
                            }
                            if (flexValue === 9) {
                                targetFlag1 = true;
                                targetFlag2 = true;
                                targetFlag3 = true;
                                targetFlag4 = true;
                                targetFlag5 = true;
                                targetFlag6 = true;
                                targetFlag7 = true;
                                targetFlag8 = true;
                                targetFlag9 = true;
                                targetValue1 = targetValue;
                                targetValue2 = targetValue + 1;
                                targetValue3 = targetValue + 2;
                                targetValue4 = targetValue + 3;
                                targetValue5 = targetValue + 4;
                                targetValue6 = targetValue + 5;
                                targetValue7 = targetValue + 6;
                                targetValue8 = targetValue + 7;
                                targetValue9 = targetValue + 8;
                            }
                            if (flexValue === 10) {
                                targetFlag1 = true;
                                targetFlag2 = true;
                                targetFlag3 = true;
                                targetFlag4 = true;
                                targetFlag5 = true;
                                targetFlag6 = true;
                                targetFlag7 = true;
                                targetFlag8 = true;
                                targetFlag9 = true;
                                targetFlag10 = true;
                                targetValue1 = targetValue;
                                targetValue2 = targetValue + 1;
                                targetValue3 = targetValue + 2;
                                targetValue4 = targetValue + 3;
                                targetValue5 = targetValue + 4;
                                targetValue6 = targetValue + 5;
                                targetValue7 = targetValue + 6;
                                targetValue8 = targetValue + 7;
                                targetValue9 = targetValue + 8;
                                targetValue10 = targetValue + 9;
                            }
                        }
                    }
                }
                if ($.fn.DataTable.isDataTable('#filterDataTable')) {
                    $('#filterDataTable').DataTable().destroy();
                    $('#filterDataTable').html('');
                    $.fn.dataTable.ext.errMode = 'none';  
                }
                if (currPageSize === 'undefined') {
                    currPageSize = 10;
                }
                if (currPageNumber === 'undefined') {
                    currPageNumber = 1;
                }
                if ($("#IsDocumentPresent").prop('checked') !== true) {
                    IsDocumentPresent = '-1';
                }
                if ($("#DocumentStatus").prop('checked') !== true) {
                    DocumentStatus = '-1';
                }
                if ($("#Customer").prop('checked') !== true) {
                    Customer = '-1';
                }
                if ($("#InsertedTime").prop('checked') !== true) {
                    InsertedTime = '-1';
                }
                if ($("#UpdatedTime").prop('checked') !== true) {
                    UpdatedTime = '-1';
                }
                
                if ($("#ETD").prop('checked') !== true) {
                    columnETD = '-1';
                }
                if ($("#ETA").prop('checked') !== true) {
                    columnETA = '-1';
                }
                if ($("#PortOfEntryDate").prop('checked') !== true) {
                    PortOfEntryDate = '-1';
                }
                if (checkValues.length > 0) {
                    $('#filterDataTable').DataTable({
                        data: data.EntryMetadataLists,
                        columns: columns,
                        scrollY: '50vh',
                        scrollCollapse: true,
                        pageLength: currPageSize,
                        searching: false, info: false, order: [[sortColumnIndex, sortColumnOrder.toLowerCase()]],
                        /*iDisplayLength: tableDisplayRowCount,*/

                        'columnDefs': [
                            {
                                'targets': RadioButton,
                                'orderable': false,
                                'render': function (data, type, row, meta) {
                                    var rowData = row.RadioButton;
                                    var dataChx;
                                    if (rowData === null) {
                                        dataChx = '<input type="radio" name = "radOperations" value="' + row.EntryMetaDataID + '"/> ';
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                }
                            }, {
                                'targets': IsDocumentPresent,
                                'render': function (data, type, row, meta) {
                                    var rowData = row.IsDocumentPresent;
                                    var datax;
                                    if (rowData === true) {
                                        datax = '&nbsp; &nbsp; <a href="javascript:void(0);" class="btn btn-secondary btn-sm active" onclick="linkDocumentsClick(\'' + row.EntryMetaDataID + '\');"> &nbsp; Y</a>';

                                    } else {
                                        datax = '<span  style="margin-left:23px;" >N</span>';
                                    }
                                    return datax;
                                }
                            }, {
                                'targets': Customer,
                                'render': function (data, type, row, meta) {
                                    var rowData = row.Customer;
                                    var datax;
                                    datax = '&nbsp; &nbsp; <a href="javascript:void(0);" class="btn btn-secondary btn-sm active" onclick="linkCustomerDetailsClick(\'' + row.EntryMetaDataID + '\');"> ' + rowData + '</a>';
                                    return datax;
                                }
                            }, {
                                'targets': DocumentStatus,
                                'render': function (data, type, row, meta) {
                                    var rowData = row.DocumentStatus;
                                    var docStat;
                                    if (rowData !== null) {
                                        if (row.Level === 'Warning') {
                                            docStat = '<div class="shipmentWarning" style="padding:9px; text-align:center;">' + rowData + '</div>';
                                        }
                                        if (row.Level === 'Critical') {
                                            docStat = '<div class="shipmentCritical" style="padding:9px; text-align:center;">' + rowData + '</div>';
                                        }
                                        if (row.Level === 'Normal') {
                                            docStat = '<div class="shipmentClear" style="padding:9px; text-align:center;">' + rowData + '</div>';
                                        }
                                    } else {
                                        docStat = '';
                                    }
                                    return docStat;
                                }
                            }, {
                                "render": function (data, type, row) {
                                    var date = row.ETD;
                                    if (data !== null) {
                                        var nowDate = new Date(parseInt(date.substr(6)));
                                        var mon = nowDate.getMonth() + 1;
                                        var dat = nowDate.getDate();
                                        return nowDate === 'ETD' ? '' : nowDate.getFullYear() + '-' + (mon < 10 ? "0" + mon : mon) + '-' + (dat < 10 ? "0" + dat : dat);
                                    } else {
                                        return '';
                                    }
                                },
                                "targets": columnETD
                            }, {
                                "render": function (data, type, row) {
                                    var date = row.ETA;
                                    if (date !== null) {
                                        var nowDate = new Date(parseInt(date.substr(6)));
                                        var mon = nowDate.getMonth() + 1;
                                        var dat = nowDate.getDate();
                                        return nowDate === 'ETA' ? '' : nowDate.getFullYear() + '-' + (mon < 10 ? "0" + mon : mon) + '-' + (dat < 10 ? "0" + dat : dat);
                                    } else {
                                        return '';
                                    }
                                },
                                "targets": columnETA
                            }, {
                                "render": function (data, type, row) {
                                    var date = row.PortOfEntryDate;
                                    if (date !== null) {
                                        var nowDate = new Date(parseInt(date.substr(6)));
                                        var mon = nowDate.getMonth() + 1;
                                        var dat = nowDate.getDate();
                                        return nowDate === 'PortOfEntryDate' ? '' : nowDate.getFullYear() + '-' + (mon < 10 ? "0" + mon : mon) + '-' + (dat < 10 ? "0" + dat : dat);
                                    } else {
                                        return '';
                                    }
                                },
                                "targets": PortOfEntryDate
                            },
                            {
                                "render": function (data, type, row) {
                                    var date = row.InsertedTime;

                                    if (date !== null) {
                                        var nowDate = new Date(parseInt(date.substr(6)));
                                        var utcDate = nowDate.toUTCString();
                                        return nowDate === 'InsertedTime' ? '' : utcformat(utcDate);
                                    } else {
                                        return '';
                                    }
                                },
                                "targets": InsertedTime
                            },

                            {
                                "render": function (data, type, row) {
                                    var date = row.UpdatedTime;

                                    if (date !== null) {
                                        var nowDate = new Date(parseInt(date.substr(6)));
                                        var utcDate = nowDate.toUTCString();
                                        return nowDate === 'UpdatedTime' ? '' : utcformat(utcDate);
                                    } else {
                                        return '';
                                    }
                                },
                                "targets": UpdatedTime
                            }, {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 1) {
                                        var currID = checkFlexIds[0];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue1
                            },
                            {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 2) {
                                        var currID = checkFlexIds[1];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue2
                            },
                            {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 3) {
                                        var currID = checkFlexIds[2];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue3
                            },
                            {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 4) {
                                        var currID = checkFlexIds[3];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue4
                            },
                            {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 5) {
                                        var currID = checkFlexIds[4];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue5
                            },
                            {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 6) {
                                        var currID = checkFlexIds[5];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue6
                            },
                            {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 7) {
                                        var currID = checkFlexIds[6];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue7
                            },
                            {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 8) {
                                        var currID = checkFlexIds[7];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue8
                            },
                            {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 9) {
                                        var currID = checkFlexIds[8];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue9
                            },
                            {
                                "render": function (data, type, row) {
                                    var flexData = row.FlexFieldEntriesMetadata;
                                    var dataChx;
                                    if (flexData !== null && flexData.length >= 10) {
                                        var currID = checkFlexIds[9];
                                        dataChx = row.FlexFieldEntriesMetadata[currID].Value;
                                    } else {
                                        dataChx = '';
                                    }
                                    return dataChx;
                                },
                                "targets": targetValue10
                            },
                            {
                                "targets": IsActive,
                                "visible": false,
                                "searchable": false
                            },
                            {
                                "targets": EntryMetaDataID,
                                "visible": false,
                                "searchable": false
                            },
                            {
                                "targets": Level,
                                "visible": false,
                                "searchable": false
                            }
                        ]
                    });


                    if (currPageSize === 'undefined') {
                        currPageSize = 10;
                    }
                    if (currPageNumber === 'undefined') {
                        currPageNumber = 1;
                    }
                    var pageLength = Math.ceil(totalRecords / currPageSize);
                    var pagingHTML = '<button type="button" id="prevButton" class="btn btn-default" style="padding: 2px 120px;" onclick="getPrevious();">Previous</button> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Page <input id="pageInputNumber" type="number" value="1" step="1" min="1" max="' + pageLength + '"  onkeypress="validateRowCountInput(event,' + pageLength + ');" > &nbsp; of ' + pageLength + ' &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Show &nbsp;&nbsp;&nbsp;';
                    pagingHTML = pagingHTML + '<select id="entriesSelect"><option>10</option><option>25</option><option>50</option><option>100</option></select>&nbsp;&nbsp;&nbsp;entries&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                    pagingHTML = pagingHTML + '<button type="button" id="nextButton" class="btn btn-default" style="padding: 2px 120px;" onclick="getNext();">Next</button>';
                    $("#filterDataTable_paginate").html(pagingHTML);
                    $("#dataTables_length").hide();
                    $('#filterDataTable').on('draw.dt', function () {//Remove sort class on all redraw
                        $("#filterDataTable td").removeClass("sorting_1");
                    });
                    $('#pageInputNumber').attr('value', currPageNumber);
                    $('#pageInputNumber').bind('focusout', function (e) {
                        if ($('#pageInputNumber').val() > pageLength) {
                            currPageNumber = pageLength;
                            $(this).attr('value', pageLength);
                        } else {
                            if ($('#pageInputNumber').val() > 0) {
                                currPageNumber = $('#pageInputNumber').val();
                                $(this).attr('value', currPageNumber);
                                getData();
                            }

                        }
                        if ($('#pageInputNumber').val() < 1) {
                            currPageNumber = '1';
                        }
                    });
                    if (currPageNumber === 1) {
                        $("#prevButton").attr('disabled', 'disabled');
                    } else {
                        $("#prevButton").removeAttr('disabled');
                    }
                    if (currPageNumber >= pageLength || pageLength === 0) {
                        $("#nextButton").attr('disabled', 'disabled');
                    } else {
                        $("#nextButton").removeAttr('disabled');
                    }
                    $('#pageInputNumber').keypress(function (event) {
                        var keycode = (event.keyCode ? event.keyCode : event.which);
                        if (keycode == '13') {
                            if ($('#pageInputNumber').val() <= pageLength && $('#pageInputNumber').val() > 0) {
                                currPageNumber = $('#pageInputNumber').val();
                                $(this).attr('value', currPageNumber);
                                getData();
                            } else {
                                $('#pageInputNumber').attr('value', pageLength);
                            }
                        }
                    });

                    $("#filterDataTable td").removeClass("sorting_1");
                    $("#filterDataTable tr").click(function () {
                        var selected = $(this).hasClass("highlight");
                        $("#filterDataTable tr").removeClass("highlight");
                        if (!selected)
                            $(this).addClass("highlight");
                    });
                    $('#entriesSelect').val(currPageSize);
                    $('#entriesSelect').change(function () {
                        currPageSize = $("#entriesSelect option:selected").val();
                  
                        currPageNumber = 1;
                        getData();
                    });
                    $("#filterDataTable thead tr th").bind("click", function (event) {
                        sortColumnName = columns[$(this).index()].data;
                        sortColumnOrder = (this.className).slice(8).toUpperCase();
                        sortColumnIndex = $(this).index();
                        // console.log((this.className).slice(8));
                        getData();
                    });
                    if (data.length === 200 && $('#searchContainer').hasClass('trigerred') === false) {
                        $('#filterDataTable_length').append('<span> <label class="recordText"> &nbsp; &nbsp;' + recordText + ' </label></span>');
                    }
                }
            }
            else {
                if ($.fn.DataTable) {
                    if ($.fn.DataTable.isDataTable('#filterDataTable_' + res)) {
                        $('#filterDataTable_' + res).DataTable().destroy();
                        $('#filterDataTable_' + res).html('');
                    }
                    if (data.length !== 0) {
                        $('#filterDataTable_' + res).DataTable({
                            data: data,
                            columns: columns,
                            searching: false, info: false,
                            stateSave: true,
                            'columnDefs': [
                                { "width": '80px', "targets": 1 },
                                {
                                    'targets': 0,
                                    'orderable': false,
                                    'width': '12%',
                                    'render': function (data, type, row, meta) {
                                        var rowData;
                                        if (res === 'ListStatus') {
                                            rowData = row.StatusId;
                                        } else if (res === 'ListEntryType') {
                                            rowData = row.EntryTypeId;
                                        } else if (res === 'ListCustomerCode') {
                                            rowData = row.CustomerCodeId;
                                        } else if (res === 'ListStatus') {
                                            rowData = row.StatusId;
                                        } else if (res === 'ListCountry') {
                                            rowData = row.CountryId;
                                        } else if (res === 'ListUniversalPort') {
                                            rowData = row.PortId;
                                        } else if (res === 'ListSalesProgram') {
                                            rowData = row.SalesProgramId;
                                        } else if (res === 'ListFlexField') {
                                            rowData = row.Id;
                                        } else if (res === 'ListSource') {
                                            rowData = row.SourceId;
                                        }
                                        else if (res === 'ListBroker') {
                                            rowData = row.BrokerId;
                                        }
                                        var dataChx;
                                        if (res === 'ListCustomerCode') {
                                            if (rowData) {
                                                dataChx = '<div style="width:100px;"><a class="btn btn-secondary btn-sm active" onclick="linkNewEditDeleteClick(\'Admin/' + res + '/Edit' + '\', \'' + rowData + '\')">Edit</a> <a class="btn btn-secondary btn-sm active"  onclick="linkNewEditDeleteClick(\'Admin/' + res + '/Delete' + '\', \'' + rowData + '\')">Delete</a> <a class="btn btn-secondary btn-sm active"  onclick="linkNewEditDeleteClick(\'Admin/' + res + '/UploadCustomerDocs' + '\', \'' + rowData + '\')">Uplod Docs</a></div>';
                                            } else {
                                                dataChx = '';
                                            }
                                        }
                                        else {

                                            if (rowData) {
                                                dataChx = '<div style="width:100px;"><a class="btn btn-secondary btn-sm active" onclick="linkNewEditDeleteClick(\'Admin/' + res + '/Edit' + '\', \'' + rowData + '\')">Edit</a> <a class="btn btn-secondary btn-sm active"  onclick="linkNewEditDeleteClick(\'Admin/' + res + '/Delete' + '\', \'' + rowData + '\')">Delete</a></div>';
                                            } else {
                                                dataChx = '';
                                            }
                                        }
                                        return dataChx;
                                    }
                                },
                                {
                                    'targets': IsDocumentPresent,
                                    'render': function (data, type, row, meta) {
                                        var rowData = row.IsDocumentPresent;
                                        var datax;
                                        if (rowData === true) {
                                            datax = '&nbsp; &nbsp; <a href="javascript:void(0);" class="btn btn-secondary btn-sm active" onclick="linkDocumentsCustomerClick(\'Admin/' + res + '/GetAllDocuments' + '\', \'' + row.CustomerCodeId + '\');"> &nbsp; Y</a>';

                                        } else {
                                            datax = '<span  style="margin-left:23px;" >N</span>';
                                        }
                                        return datax;
                                    }
                                },
                                {
                                    "render": function (data, type, row) {
                                        var date = row.InsertedTime;

                                        if (date !== null) {
                                            var nowDate = new Date(parseInt(date.substr(6)));
                                            var utcDate = nowDate.toUTCString();
                                            return nowDate === 'InsertedTime' ? '' : utcformat(utcDate);
                                        } else {
                                            return '';
                                        }
                                    },
                                    "targets": InsertedTime
                                },

                                {
                                    "render": function (data, type, row) {
                                        var date = row.UpdatedTime;

                                        if (date !== null) {
                                            var nowDate = new Date(parseInt(date.substr(6)));
                                            var utcDate = nowDate.toUTCString();
                                            return nowDate === 'UpdatedTime' ? '' : utcformat(utcDate);
                                        } else {
                                            return '';
                                        }
                                    },
                                    "targets": UpdatedTime
                                },
                                {
                                    "targets": 'Customer ID',
                                    "visible": false,
                                    "searchable": false
                                }]
                        });
                    }
                }
                if (data.length === 200 && $('#searchContainer').hasClass('trigerred') === false) {
                    $('#filterDataTable_' + res + '_length').append('<span> <label class="recordText"> &nbsp; &nbsp;' + recordText + ' </label></span>');
                }
                formatGridStyle(res);
            }
            paramsData = '';
            sessionStorage.clear();
            $('#ajax_loader').hide();
            modal.dialog('close');
        },
        error: function (xhr) {
            //alert('error');
            $('#ajax_loader').hide();
            modal.dialog('close');

        },
        complete: function () {
            //back to normal!
            $('#ajax_loader').hide();
            modal.dialog('close');
        }
    });

}
function validateRowCountInput(evt, pageNumber) {
    var theEvent = evt || window.event;
    // console.log(theEvent);
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
    if (theEvent.keyCode === 46) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
function utcformat(d) {
    d = new Date(d);
    var tail = 'GMT', D = [d.getFullYear(), d.getMonth() + 1, d.getDate()],
        T = [d.getHours(), d.getMinutes(), d.getSeconds()];
    if (+T[0] > 12) {
        T[0] -= 12;
        tail = ' PM ';
    }
    else tail = ' AM ';
    var i = 3;
    while (i) {
        --i;
        if (D[i] < 10) D[i] = '0' + D[i];
        if (T[i] < 10) T[i] = '0' + T[i];
    }
    return D.join('-') + ' ' + T.join(':') + tail;
}
function showCurrentPaging(obj) {
    //console.log(obj);
}
function getPrevious() {
    currPageNumber = parseInt(currPageNumber) - 1;
    if (currPageNumber > 0) {
        getData();
    }
}
function getNext() {
    currPageNumber = parseInt(currPageNumber) + 1;
    $("#prevButton").removeAttr("disabled");
    getData();
}
function getHomePrevious() {
    currPageNumber = parseInt(currPageNumber) - 1;
    if (currPageNumber > 0) {
        getHomeData();
    }
}
function getHomeNext() {
    currPageNumber = parseInt(currPageNumber) + 1;
    $("#prevButton").removeAttr("disabled");
    getHomeData();
}
function clearValueSelected(rowNo) {
    $('#valueList' + rowNo + ' option').removeAttr('selected');
}
function getCountries(rowNo) {
    var url = '/Home/GetCountries';
    var FromAdmin = false;
    if (window.location.pathname.indexOf("/Admin/") > -1) {
        FromAdmin = true;
    }
    var valueList = '<select class="form-control" onchange="clearValueSelected(\'' + rowNo + '\');"><option value="">Please select</option>';
    $.ajax({
        url: url,
        data: { FromAdmin: FromAdmin },
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            for (var i = 0; i <= data.length - 1; i++) {
                var countryNiceName = data[i].CountryNiceName;
                if (countryNiceName === null) {
                    countryNiceName = '';
                } else {
                    countryNiceName = ' (' + data[i].CountryNiceName + ')';
                }
                valueList = valueList + '<option value="' + data[i].CountryName + '">' + data[i].CountryName + countryNiceName + '</option>';
            }
            valueList = valueList + '</select>';
            $('#valueList' + rowNo).html(valueList);

        },
        error: function (xhr) {
            //alert('error');

        },
        complete: function () {
            //back to normal!

        }
    });
}
function getCountriesFromSearch(rowNo, coountyCode) {
    var url = '/Home/GetCountries';
    var FromAdmin = false;
    if (window.location.pathname.indexOf("/Admin/") > -1) {
        FromAdmin = true;
    }
    var valueList = '<select class="form-control" onchange="clearValueSelected(\'' + rowNo + '\');"><option value="">Please select</option>';
    $.ajax({
        url: url,
        data: { FromAdmin: FromAdmin },
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            for (var i = 0; i <= data.length - 1; i++) {
                var countryNiceName = data[i].CountryNiceName;
                if (countryNiceName === null) {
                    countryNiceName = '';
                } else {
                    countryNiceName = ' (' + data[i].CountryNiceName + ')';
                }
                valueList = valueList + '<option value="' + data[i].CountryName + '">' + data[i].CountryName + countryNiceName + '</option>';
            }
            valueList = valueList + '</select>';
            $('#valueList' + rowNo).html(valueList);
            $("#valueList" + rowNo + " option[value="+coountyCode+"]").attr("selected", "selected");

        },
        error: function (xhr) {
            //alert('error');

        },
        complete: function () {
            //back to normal!

        }
    });
}
function getMaerskStatus(rowNo) {
    var valueList = '<select class="form-control" onchange="clearValueSelected(\'' + rowNo + '\');"><option value="">Please select</option>';
    $.ajax({
        url: 'ListStatus/GetMaerskStatus',
        data: {},
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            for (var i = 0; i <= data.length - 1; i++) {
                valueList = valueList + '<option value="' + data[i].MaerskStatusName + '">' + data[i].MaerskStatusName + '</option>';
            }
            valueList = valueList + '</select>';
            $('#valueList' + rowNo).html(valueList);
        },
        error: function (xhr) {
            //alert('error');

        },
        complete: function () {
            //back to normal!

        }
    });
}
function getLevel(rowNo) {
    var valueList = '<select class="form-control" onchange="clearValueSelected(\'' + rowNo + '\');"><option value="">Please select</option>';
    $.ajax({
        url: 'ListStatus/Getlevel',
        data: {},
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            for (var i = 0; i <= data.length - 1; i++) {
                valueList = valueList + '<option value="' + data[i].Level + '">' + data[i].Level + '</option>';
            }
            valueList = valueList + '</select>';
            $('#valueList' + rowNo).html(valueList);
        },
        error: function (xhr) {
            //alert('error');

        },
        complete: function () {
            //back to normal!

        }
    });
}
function getGlobalCountries(rowNo) {
    var valueList = '<select class="form-control" onchange="clearValueSelected(\'' + rowNo + '\');"><option value="">Please select</option>';
    $.ajax({
        url: '/Home/GetGlobalCountries',
        data: {},
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            for (var i = 0; i <= data.length - 1; i++) {
                var countryNiceName = data[i].GlobalCountryNiceName;
                if (countryNiceName === null) {
                    countryNiceName = '';
                } else {
                    countryNiceName = ' (' + data[i].GlobalCountryNiceName + ')';
                }
                valueList = valueList + '<option value="' + data[i].GlobalCountryISO + '">' + data[i].GlobalCountryISO + countryNiceName + '</option>';
            }
            valueList = valueList + '</select>';
            $('#valueList' + rowNo).html(valueList);

        },
        error: function (xhr) {
            //alert('error');

        },
        complete: function () {
            //back to normal!

        }
    });
}
function getSalesProgram(rowNo) {
    var valueList = '<select class="form-control" onchange="clearValueSelected(\'' + rowNo + '\');"><option value="">Please select</option>';
    $.ajax({
        url: '/Home/GetSalesProgram',
        data: {},
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            for (var i = 0; i <= data.length - 1; i++) {
                valueList = valueList + '<option value="' + data[i].SalesProgramName + '">' + data[i].SalesProgramName + '</option>';
            }
            valueList = valueList + '</select>';
            $('#valueList' + rowNo).html(valueList);

        },
        error: function (xhr) {
            //alert('error');

        },
        complete: function () {
            //back to normal!

        }
    });
}


function InitilizeParameters(json) {
    paramsData = json;
    if (!sessionStorage)
        return;
    var data = sessionStorage.getItem("search_html");
    if (!data || data === null || data === 'undefined') {
        //getData(null);
        return null;
    }
    sessionHTMLData = JSON.parse(data);
    var currentpageURL = getCurrentURL();
    if (currentpageURL === localStorage.getItem('lastURL')) {
        $('#searchContainer').html(sessionHTMLData);
    }
    currPageNumber = sessionStorage.getItem('currPageNumber');
    currPageSize = sessionStorage.getItem('currPageSize');
    //getData(null);
}

function getColumnPosition(columns) {
    for (var i = 0; i <= columns.length - 1; i++) {
        if (columns[i].data === 'ETD') {
            columnETD = i;
        }
    }
    for (var p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'ETA') {
            columnETA = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'IsDocumentPresent') {
            IsDocumentPresent = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'Customer') {
            Customer = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'DocumentStatus') {
            DocumentStatus = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'PortOfEntryDate') {
            PortOfEntryDate = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'InsertedTime') {
            InsertedTime = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'UpdatedTime') {
            UpdatedTime = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'IsActive') {
            IsActive = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'EntryMetaDataID') {
            EntryMetaDataID = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'Level') {
            Level = p;
        }
    }
    for (p = 0; p <= columns.length - 1; p++) {
        if (columns[p].data === 'RadioButton') {
            RadioButton = p;
        }
    }

}
function formatGridStyle(res) {
    $("#filterDataTable_" + res + "_paginate").css('float', 'left');
    $('#filterDataTable_' + res).on('draw.dt', function () {//Remove sort class on all redraw
        $("#filterDataTable_" + res + " td").removeClass("sorting_1");
    });
    $("#filterDataTable_" + res + " td").removeClass("sorting_1");
    $("#filterDataTable_" + res + " th").removeClass("sorting_asc");
    $("#filterDataTable_" + res + " tr").click(function () {
        var selected = $(this).hasClass("highlight");
        $("#filterDataTable_" + res + " tr").removeClass("highlight");
        if (!selected)
            $(this).addClass("highlight");
    });

    $('#filterDataTable_' + res).css("margin-left", "0px");

    $('#filterDataTable_' + res + ' td').css('font-size', '11px');

    $('#filterDataTable_' + res + '_length').css('font-size', '10px');

    $('#filterDataTable_' + res + '_paginate').css('font-size', '10px');

    $('#filterDataTable_' + res + '_wrapper.dataTables_scroll').css('border-right', '1px solid #dddddd');

    $('#filterDataTable_' + res + '.highlight').css('background - color', '#64b2d4!important');
}
function getSearchResults() {
    var searchDrpData = '<option value="sel">Please Select Saved Search</option>';
    $.ajax({
        url: '/Home/GetSearchResults',
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            saveSearchData = data;
            for (var drp = 0; drp < data.length; drp++) {
                searchDrpData = searchDrpData + '<option value="'+drp+'">' + data[drp].SaveSearchName +'</option>';
            }

            
            $("#searchOptions").html(searchDrpData);

        },
        error: function (xhr) {
            alert('error getting search data');

        },
        complete: function () {
            //back to normal!

        }
    });
}
function SaveSearch() {
    var saveSearchName = $("#saveSearchName").val();
    var jsonData = [];
    var favorite = [];
    $.each($("input[name='flexCheck']:checked"), function () {
        favorite.push($(this).val());
    });
    if (sessionStorage.length === 0 || sessionStorage.getItem('currPageSize') === 'undefined')
    {
        // currPageSize = 10;
        jsonData = GetParameterValues();
    }
    else
    {
        if (paramsData !== '')
        {
            jsonData = paramsData;
        }
        else
        {
            jsonData = localStorage.getItem("jsonData");
        }
        
    }
    // console.log(' - flexfieldsJSONData--  ', favorite);   
    $.ajax({
        url: '/Home/SaveSearch',
        data: { SearchName: saveSearchName, SearchParams: jsonData, RecordCount: currPageSize, FlexFields: JSON.stringify(favorite) },
        datatype: "json",
        type: "post",
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        async: true,
        success: function (data) {
            $("#dialog_SaveSearchName").dialog("close");
            getSearchResults();
            $("#dialog_SuccessSaveSearchName").dialog("open");
            setTimeout(function () { $("#dialog_SuccessSaveSearchName").dialog("close"); }, 2000);          
            $('#openSearchDialog').attr('disabled','disabled');
        },
        error: function (xhr) {
            alert('An error occured during saving, contact administrator.');

        },
        complete: function () {
            //back to normal!

        }
    });
}