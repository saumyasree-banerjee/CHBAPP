function lnkRegisterClick() {
    SaveSession('AddShipment', "");
    advancedFilterSession();
}
function advancedFilterSession() {
    var searchHtml = $('#searchContainer').html();
    var tableDisplayRow = $("[name=filterDataTable_length]").val();
    var currPageSize = $("#entriesSelect option:selected").val();
    var currPageNumber;
    if (window.location.pathname.indexOf("/Admin/") > -1) {
        currPageNumber = '1';
    } else {
        currPageNumber = $('#pageInputNumber').val();
    }
   
    sessionStorage.setItem("search_html", JSON.stringify(searchHtml));
    sessionStorage.setItem("filterLength", tableDisplayRow);
    sessionStorage.setItem("currPageSize", currPageSize);
    sessionStorage.setItem("currPageNumber", currPageNumber);
}
function btnEditClick() {
    var checkedButton = $('input[name=radOperations]:checked').val();
    if (checkedButton === undefined) {
        alert("Please check a radio button to edit");
        return false;
    }
    SaveSession('UpdateShipment', checkedButton);
    advancedFilterSession();
}
function btnDeleteClick() {
    var checkedButton = $('input[name=radOperations]:checked').val();
    if (checkedButton === undefined) {
        alert("Please check a radio button to delete");
        return false;
    }
    SaveSession('DeleteShipment', checkedButton);
    advancedFilterSession();
}
function btnUpdateStatusClick() {
    var checkedButton = $('input[name=radOperations]:checked').val();
    if (checkedButton === undefined) {
        alert("Please check a radio button to update status");
        return false;
    }
    SaveSession('UpdateShipmentStatus', checkedButton);
    advancedFilterSession();
}
function btnGetAllStatusClick() {
    var checkedButton = $('input[name=radOperations]:checked').val();
    if (checkedButton === undefined) {
        alert("Please check a radio button to see all status");
        return false;
    }
    SaveSession('GetAllShipmentStatus', checkedButton);
    advancedFilterSession();
}
function btnUploadDocsClick() {
    var checkedButton = $('input[name=radOperations]:checked').val();
    if (checkedButton === undefined) {
        alert("Please check a radio button to upload documents");
        return false;
    }
    SaveSession('UploadShipmentDocs', checkedButton);
    advancedFilterSession();
}
function btnDownloadTemplateClick() {
    window.location = '/DownloadCountryTemplate'
}
function linkDocumentsClick(checkedButton) {
    SaveSession('GetAllDocuments', checkedButton);
    advancedFilterSession();
}
function linkCustomerDetailsClick(checkedButton) {
    window.open('/CustomerDetails/' + checkedButton, '_radioTab');
}
function linkDocumentsCustomerClick(uri, id) {
    SaveSession(uri, id);
    advancedFilterSession();
}
function linkNewEditDeleteClick(uri, id) {
    SaveSession(uri, id);
    advancedFilterSession();
}

function lnkUploadShipmentsClick() {
    SaveSession('UploadShipments', "");
    advancedFilterSession();
}
function SaveSession(url, checkedButton) {
    var jsonData = GetParameterValues();
    $.ajax({
        url: '/Home/SaveSession',
        data: { JsonData: jsonData },
        datatype: "json",
        type: "post",
        async: true,
        traditional: true,
        contenttype: 'application/json; charset=utf-8',
        success: function (data) {
            if (url.indexOf('Admin/ListCustomerCode/UploadCustomerDocs') >= 0 || url.indexOf('Admin/ListCustomerCode/GetAllDocuments') >= 0)
                window.open('/' + url + '/' + checkedButton, '_radioTab');
            else if (url.indexOf('Admin/') >= 0)
                window.location.href = '/' + url + '/' + checkedButton;
            else
                window.open('/' + url + '/' + checkedButton, '_radioTab');
        },
        error: function (xhr) {
            //alert('error');
        },
        complete: function () {
            //back to normal!
        }
    });
}
function GetParameterValues(params) {
    var childCount = $('#searchContainer').children().length;
    var jsonData = [];
    for (var i = 1; i <= childCount; i++) {
        $('#columnList' + i + ' option:selected').attr('selected', 'selected');
        $('#valueList' + i + ' option:selected').attr('selected', 'selected');
        $('#operator' + i + ' option:selected').attr('selected', 'selected');
        var columnName = $('#columnList' + i + ' option:selected').val();
        var operator = $('#operator' + i).val();
        var value1 = '';
        var value2 = '';
        if (operator === 'Range') {
            value1 = $('#valueList' + i + ' > div > input.range1').val();
            value2 = $('#valueList' + i + ' > div > input.range2').val();
            //$('#valueList' + i + ' > div > input.range1').attr('value',value1);
            //$('#valueList' + i + ' > div > input.range2').attr('value',value2);
        } else if (operator === 'BooleanEqual') {
            value1 = $('#valueList' + i + ' option:selected').val();
        } else if (columnName === 'Country' || columnName === 'CountryOfOrig' || columnName === 'CountryName' || columnName === 'Level' || columnName === 'MaerskStatusName' || columnName === 'SalesProgram' || columnName === 'SalesProgramName') {
            value1 = $('#valueList' + i + ' option:selected').val();
        } else {
            value1 = $('#valueList' + i + ' > input').val();
            $('#valueList' + i + ' > input').attr('value', value1);
        }
        if (value1 === '' || value1 === undefined) {
            $('#searchContainer').removeClass('trigerred');
        } else {
            $('#searchContainer').addClass('trigerred');
        }
        var tempObj = {
            'ColumnName': columnName,
            'Operator': operator,
            'Value1': value1,
            'Value2': value2
        };
        jsonData.push(tempObj);
    }
    if (params === null) {
        jsonData = [];
        tempObj = {
            'ColumnName': "",
            'Operator': "",
            'Value1': "",
            'Value2': ""
        };
        jsonData.push(tempObj);
        jsonData = JSON.stringify(jsonData);
    } else {
        jsonData = JSON.stringify(jsonData);
    }
    return jsonData;
}