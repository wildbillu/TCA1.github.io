// TC-CAB-Setup.js
//

function CAB_MakeRowEntry2toN(iRow)
{ // ids are CA_#_R CA_#_C CA_# CA_#_Place
    // classes are CAB_Row_Base CAB_Clue_Text 
    var sInner = '';
    sInner += '<TR Id="CA_';
    sInner += iRow; 
    sInner += '_R" class="CAB_Row_Base"><TD><TABLE cellspacing=1 cellpadding=0 align="right"><TR><TD Id="CA_';
    sInner += iRow; 
    sInner += '_C" class="CAB_Clue_Text">CLUE</TD><TD Id="CA_';
    sInner += iRow; 
    sInner += '_A">ANSWER</TD><TD Id="CA_';
    sInner += iRow; 
    sInner += '_Place">PLACE</TD></TR></TABLE></TD></TR>';
    return sInner;
}

function CAB_LoadClueAnswerSection()
{
    var s01 = CAB_Clues1And2Entries_MakeInnerHTML();
    document.getElementById('CA_01').innerHTML = s01;
    var iLastRow = g_aClues.length;
// first we need to load the span
    for ( iX = 2; iX < iLastRow; iX++ )
        CAB_SetRow(iX);
    for ( var iR = 0; iR < iLastRow; iR++ )
        CAB_SetRowToInActive(iR)
}

function CAB_MakeButtonsForAnswer(iRow)
{
    var sInnerHTML = '';
    sInnerHTML += '<DIV>';
    var iLength = g_aAnswers[iRow].length;
    for ( var iLetter = 0; iLetter < iLength; iLetter++ )
    {
        sInnerHTML += CAB_MakeButtonSingleHTML(iRow, iLetter);
    }
    sInnerHTML += '</DIV>';
    return sInnerHTML;
}

function CAB_MakeButtonSingleHTML(iRow, iLetter)
{
    var sInnerRowHTML = '';
    var sFunctionsToCall = '';
    sFunctionsToCall += ' onkeypress="return CAB_onkeypress(event);"';
    sFunctionsToCall += ' onkeyup="return CAB_onkeydown(event.key,' + iRow + ',' + iLetter + ');"';
    sFunctionsToCall += ' onfocus="CAB_onfocus(this);"';
    sInnerRowHTML += '<BUTTON '
    sInnerRowHTML += CAB_MakeHTMLId(iRow, iLetter);
    sInnerRowHTML += ' class="' + g_CAB_Button_sClass + '" ';
    sInnerRowHTML += sFunctionsToCall;
    sInnerRowHTML += '>';
    return sInnerRowHTML;
}

function CAB_SetRow(iRow)
{
    var sClue = g_aClues[iRow];
    var sInnerHTML = CAB_MakeButtonsForAnswer(iRow);
    var sAnswerElement = 'CA_' + iRow + '_A'
    document.getElementById(sAnswerElement).innerHTML = sInnerHTML;
//
    var sPlaceElement = 'CA_' + iRow + '_Place'
    var sPlaceInnerHTML = '<TD>' + CA_PlaceButton_Setup(iRow) + '</TD>';
    var elemPlace = document.getElementById(sPlaceElement);
    elemPlace.innerHTML = sPlaceInnerHTML;
    var iPlaceWidth = elemPlace.getBoundingClientRect().width;
//
    var sClueElement = 'CA_' + iRow + '_C'
    var elemClue = document.getElementById(sClueElement);

    var iAnswerLength = g_aAnswers[iRow].length;
    var sRightButtonElem = CAB_MakeId(iRow, iAnswerLength-1);
    var rectRightButtonElem = document.getElementById(sRightButtonElem).getBoundingClientRect();

    var elem = document.getElementById("MoreButton");
    var rectMoreButton = elem.getBoundingClientRect();
    var iKnownWidth = rectMoreButton.right-10;
    var iWidthLeft = iKnownWidth - iPlaceWidth - iAnswerLength * rectRightButtonElem.width; 
    elemClue.innerHTML = sClue;
    elemClue.style.width = MakePixelString(iWidthLeft);
}

function CAB_Clues1And2Entries_MakeInnerHTML()
{
    var s = '';
		s+='<TABLE class="Row_DualClue">';
    	s+='<TR align=center><TD>' + CAB_TableForDualAnswer() + '</TD></TR>';
        s+='</TABLE>';
    return s;
}

function CAB_TableForDualAnswer()
{
    var sInnerHTML = '';
    sInnerHTML += '<TABLE cellspacing=0 padding=0><TR width=100%>';
    sInnerHTML += '<TD>' + CA_PlaceButton_Setup(0) + '</TD>';
    sInnerHTML += '<TD class="CAB_Clue_Text">' + g_sDualClueBefore + '</TD>';
    sInnerHTML += '<TD>' + CAB_MakeButtonsForAnswer(0) + '</TD>';
    sInnerHTML += '<TD class="CAB_Clue_Text">' + g_sDualClueMiddle + '</TD>';
    sInnerHTML += '<TD>' + CAB_MakeButtonsForAnswer(1) + '</TD>';
    sInnerHTML += '<TD class="CAB_Clue_Text">' + g_sDualClueEnd + '</TD>';
    sInnerHTML += '<TD>' + CA_PlaceButton_Setup(1) + '</TD>';
    sInnerHTML += '</TR></TABLE>';
    return sInnerHTML;
}




