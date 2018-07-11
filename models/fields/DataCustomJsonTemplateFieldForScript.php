<?php
defined('_JEXEC') or die('Restricted access');

jimport('joomla.form.formfield');

$module_name = 'mod_sgmap';
$document = JFactory::getDocument();

class JFormFieldDataCustomJsonTemplateFieldForScript extends JFormField {

	protected $type = 'DataCustomJsonTemplateFieldForScript';

    
	public function getLabel() {
		
		return '';
    }

	public function getInput() {
        $html = '';
        
        return $html;
	}
}