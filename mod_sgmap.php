<?php
/**
 * Module Entry Point
 * 
 * @package    
 * @subpackage Modules
 * @license    
 * @link       
 * 
 */

// No direct access
defined('_JEXEC') or die;
// Include the syndicate functions only once
require_once dirname(__FILE__) . '/helper.php';

$hello = modSGMap::getCustomData($params);
require JModuleHelper::getLayoutPath('mod_sgmap');