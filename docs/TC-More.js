// TC-More.js

function Dropdown_More_SolveAsConventional()
{
    if ( g_aAnswerLocations.length != g_iClues ) // should never get here but....
        return;
    var sNewDualClueText = '(' + g_aAnswerLocations[0] + ') ' + g_ST_sClue_Itself + ' (' + g_aAnswerLocations[1] + ')'
	document.getElementById('CA01C').innerHTML = sNewDualClueText;
    for ( iRR = 2; iRR < g_iClues; iRR++ )
    {
        var sId = 'CA_' + iRR + '_C';
        var eRow = document.getElementById(sId)
        var sClue = g_aClues[iRR];
        var sNewText = '(' + g_aAnswerLocations[iRR] + ') \n' + sClue;
        eRow.innerHTML = sNewText;
    }
}

function Dropdown_More_ResetPuzzle()
{
    CAB_ClearAnswers();
    GRB_ClearGrid();
    Status_Check();  
    StoreCookie_Puzzle();
    FeaturesDependingOnPuzzleSolved();
    elem = document.getElementById(CAB_MakeId(0,0)).focus();
}

function Dropdown_CanOpen()
{
    if ( g_bDropdown_Menu_Active ) return false;
    if ( g_bButton_Settings_Active ) return false;
    if ( g_bButton_Info_Active ) return false;
    if ( g_bSuccessWindow_Active ) return false;
    if ( g_bPlaceWindow_Active ) return false;
    if ( g_bSketchiToonsFullWindow_Active ) return false;
    return true;
}

var g_bDropdown_Menu_Active = false;
var g_sCAOnMoreClick = '';
var g_sGRBOnMoreClick = '';

function Dropdown_More_CheckPuzzle()
{
    GRB_ShowCheckGrid('Check');
    CAB_ShowCheckAnswers('Check');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_SolveAnswers()
{
    CAB_ShowCheckAnswers('Show');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_SolveGrid()
{
    GRB_ShowCheckGrid('Show');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_SolvePuzzle()
{
    CAB_ShowCheckAnswers('Show');
    GRB_ShowCheckGrid('Show');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_ShowSquare()
{
    if ( !CAB_ShowCheckActiveSquare('Show') )
        GRB_ShowCheckActiveSquare('Show');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_CheckSquare()
{
    if ( !CAB_ShowCheckActiveSquare('Check') )
        GRB_ShowCheckActiveSquare('Check')
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide()
}

function Dropdown_More_ShowAnswer()
{
    if ( !CAB_ShowCheckAnswerActiveRow('Show') )
        GRB_ShowCheckAnswerActiveRowOrColumn('Show');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_CheckAnswer()
{
    if ( !CAB_ShowCheckAnswerActiveRow('Check') )
        GRB_ShowCheckAnswerActiveRowOrColumn('Check');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide()
}

function Dropdown_More_Show()
{
// prevent open if other popup is open
    if ( !Dropdown_CanOpen() )
        return false;
    g_sCAOnMoreClick = g_CAB_Focus_sId;
    g_sGRBOnMoreClick = g_GRB_Focus_sId;

    var elemPopupItself = document.getElementById("Popup_Button_More");
//    elemPopupItself.style.left = MakePixelString(iLeft);
//    elemPopupItself.style.top  = MakePixelString(iTop);


    var element = document.getElementById("Dropdown_More_Content");
    var iLeft = 120;
    var iTop  = -25;
    element.style.left = MakePixelString(iLeft);
    element.style.top  = MakePixelString(iTop);

    element.classList.toggle("show");
    g_bDropdown_Menu_Active = true;
    return false;
}

function Dropdown_More_Hide()
{
    if ( g_sCAOnMoreClick != '')
        document.getElementById(g_sCAOnMoreClick).focus();
    if ( g_sGRBOnMoreClick != '')
        document.getElementById(g_sGRBOnMoreClick).focus();
    g_sCAOnMoreClick = '';
    g_sGRBOnMoreClick = '';
    e = document.getElementById("Dropdown_More_Content");
    e.classList.toggle("show");
    g_bDropdown_Menu_Active = false;
}


function Insertable_Dropdown_Menu_More()
{
    var sDropdownMenu = ''
    sDropdownMenu += '<span class="Dropdown_SpanPadding" Id="span1"></span>'; // this is needed to position the dropdown properly
    sDropdownMenu += '<div Id="Dropdown_More" width=320 class="Dropdown_More">';
    sDropdownMenu += '   <div Id="Dropdown_More_Content" class="Dropdown_More_Content" align=center>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_ShowAnswer" onclick="Dropdown_More_ShowAnswer();">Reveal Selected Answer</BUTTON>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_ShowSquare" onclick="Dropdown_More_ShowSquare();">Reveal Selected Square</BUTTON>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_SolveAnswers" onclick="Dropdown_More_SolveAnswers();">Reveal Answers To Clues</BUTTON>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_SolveGrid" onclick="Dropdown_More_SolveGrid();">Reveal Answers To Grid</BUTTON>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_SolvePuzzle" onclick="Dropdown_More_SolvePuzzle();">Reveal Puzzle</BUTTON>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_CheckAnswer" onclick="Dropdown_More_CheckAnswer();">Check Selected Answer</BUTTON>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_CheckSquare" onclick="Dropdown_More_CheckSquare();">Check Selected Square</BUTTON>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_CheckPuzzle" onclick="Dropdown_More_CheckPuzzle();">Check Puzzle</BUTTON>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_SolveAsConventional" onclick="Dropdown_More_SolveAsConventional();">Solve As Standard Crossword</BUTTON>';
    sDropdownMenu += '      <BUTTON class="Dropdown_More_Button" Id="Dropdown_More_ResetPuzzle" onclick="Dropdown_More_ResetPuzzle();">Reset All</BUTTON>';
    sDropdownMenu += '   </div>';
    sDropdownMenu += '</div>';
    var elemPopupItself = document.getElementById("Popup_Button_More");
    elemPopupItself.innerHTML = sDropdownMenu;
    var iLeft = 100;
    var iTop  = 50;
    elemPopupItself.style.left = MakePixelString(iLeft);
    elemPopupItself.style.top  = MakePixelString(iTop);
}

function Make_Dropdown_Menu_More()
{
    sImage = '<img Id="Button_More_Image" src="images/Button_More.png" alt="Success" width=100%>'
    var sDropdownMenu = '';
    sDropdownMenu += '<BUTTON Id="MoreButton" class="TopRowControl_Button" onclick="Dropdown_More_Show();" >' + sImage + '</BUTTON>';
    return sDropdownMenu;
}



