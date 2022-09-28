// TC-Button-More.js
//sDropdownMenu += '<span class="Dropdown_SpanPadding" style="display: inline-block; width: 300px;" Id="span1"></span>';

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
var g_sGROnMoreClick = '';

function Dropdown_More_CheckPuzzle()
{
    CA_ShowCheckPuzzle('Check');
    GR_ShowCheckPuzzle('Check');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_SolvePuzzle()
{
    CA_ShowCheckPuzzle('Show');
    GR_ShowCheckPuzzle('Show');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_ShowSquare()
{
    if ( !CA_ShowCheckSquare('Show') )
        GR_ShowCheckSquare('Show');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_CheckSquare()
{
    if ( !CA_ShowCheckSquare('Check') )
        GR_ShowCheckSquare('Check')
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide()
}
function Dropdown_More_ShowAnswer()
{
    if ( !CA_ShowCheckAnswer('Show') )
        GR_ShowCheckAnswer('Show');
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide();
}

function Dropdown_More_CheckAnswer()
{
    if ( !CA_ShowCheckAnswer('Check') )
        GR_ShowCheckAnswer('Check')
    StoreCookie_Puzzle();    
    Status_Check();
    Dropdown_More_Hide()
}

function Dropdown_More_Show()
{
// prevent open if other popup is open
    if ( !Dropdown_CanOpen() )
        return false;
    g_sCAOnMoreClick = g_sCAidWithFocus;
    g_sGROnMoreClick = g_GR_sFocus;
    element = document.getElementById("Dropdown_More_Content");
    element.classList.toggle("show");
    g_bDropdown_Menu_Active = true;
    return false;
}

function Dropdown_More_Hide()
{
    if ( g_sCAOnMoreClick != '')
        document.getElementById(g_sCAOnMoreClick).focus();
    if ( g_sGROnMoreClick != '')
        document.getElementById(g_sGROnMoreClick).focus();
    g_sCAOnMoreClick = '';
    g_sGROnMoreClick = '';
    e = document.getElementById("Dropdown_More_Content");
    e.classList.toggle("show");
    g_bDropdown_Menu_Active = false;
}

function Insertable_Dropdown_Menu_More()
{
    var sDropdownMenu = ''
    sDropdownMenu += '<span class="Dropdown_SpanPadding" Id="span1"></span>'; // this is needed to position the dropdown properly
    sDropdownMenu += '<div Id="Dropdown_More" width=300 class="Dropdown_More">';
    sDropdownMenu += '   <div Id="Dropdown_More_Content" class="Dropdown_More_Content">';
    sDropdownMenu += '      <text onclick="Dropdown_More_ShowAnswer();">Reveal Answer</text>';
    sDropdownMenu += '      <text onclick="Dropdown_More_ShowSquare();">Reveal Square</text>';
    sDropdownMenu += '      <text onclick="Dropdown_More_SolvePuzzle();">Reveal Puzzle</text>';
    sDropdownMenu += '      <text onclick="Dropdown_More_CheckAnswer();">Check Answer</text>';
    sDropdownMenu += '      <text onclick="Dropdown_More_CheckSquare();">Check Square</text>';
    sDropdownMenu += '      <text onclick="Dropdown_More_CheckPuzzle();">Check Puzzle</text>';
    sDropdownMenu += '   </div>';
    sDropdownMenu += '</div>';
    document.getElementById("Popup_Button_More").innerHTML = sDropdownMenu;
}

function Make_Dropdown_Menu_More()
{
    sImage = '<img Id="Button_More_Image" src="images/Button_More.png" alt="Success" width=100%>'
    var sDropdownMenu = '';
    sDropdownMenu += '<BUTTON class="TopRowControl_Button" onclick="Dropdown_More_Show();" >' + sImage + '</BUTTON>';
    return sDropdownMenu;
}


