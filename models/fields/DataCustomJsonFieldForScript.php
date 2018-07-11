<?php
defined('_JEXEC') or die('Restricted access');

jimport('joomla.form.formfield');

$module_name = 'mod_sgmap';
$document = JFactory::getDocument();
$document->addScript(JURI::root().'modules/'.$module_name.'/tmpl/js/administrator/jsonEditor.js');
$document->addScript(JURI::root().'modules/'.$module_name.'/tmpl/js/administrator/jquery-3.3.1.min.js');

$document->addStyleSheet(JURI::root().'modules/'.$module_name.'/tmpl/css/administrator/style.css');
$document->addStyleSheet(JURI::root().'modules/'.$module_name.'/tmpl/css/font-awesome-4.7.0/css/font-awesome.min.css');

class JFormFieldDataCustomJsonFieldForScript extends JFormField {

	protected $type = 'DataCustomJsonFieldForScript';

    
	public function getLabel() {
		
		return '';
    }

	public function getInput() {
        $html = '';
        
        return $html;
	}
}