<?php 
// No direct access
defined('_JEXEC') or die; 

$document = JFactory::getDocument();
$document->addStyleSheet(JURI::base().'modules/'.$module->module.'/tmpl/css/map.css');

$dataMarkers = $params->get('dataJson');
?>

<script>
	var dataMarkers = <?php echo $dataMarkers; ?>;
</script>

<div onload="main()">
	<div>
		<p>
            <?php echo JURI::base().'modules/'.$module->module; ?>
        </p>
    </div>
	<div id="parent">
		<div class="left">
			<div>
				<label for="name">Назва: </label>
				<input type="text" name="name" id="name">
				<br />

				<label for="city">Місто: </label>
				<input type="text" name="city" id="city">
				<br />

				<button onclick="filterMarkers()">Search</button>
				<button onclick="main()">Reset</button>
			</div>
		</div>
		<div id="floating-panel">
			<b>From: </b>
			<select id="start">
				<option value="Sumy, Avtovokzal">Автостанція</option>
				<option value="Sumy, Zaliznychnyi vokzal">Залізничний вокзал</option>
			</select>
			<b>To: </b>
			<select id="end">
                <option value="50.8918714, 34.8431048">СумДУ</option>
			</select>
			<button onclick="calculateAndDisplayRoute()">Go</button>
		</div>
		<div id="googleMap" class="right">

		</div>
	</div>

	<div>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla quos quibusdam nostrum ea et ab nihil blanditiis distinctio voluptas nam. Tempora similique ea maxime enim veritatis iure error repellat tempore.</p>
    </div>

	<script src="<?php echo JURI::base().'modules/'.$module->module; ?>/tmpl/js/map.js"></script>
	<script src="<?php echo JURI::base().'modules/'.$module->module; ?>/tmpl/js/autoComplite.js"></script>
	<script>
		window.onload = function () {
			main();
			ac.init("name");
		}
	</script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAexZwVK_NCRmeT99d_CwD5TxSS19Fod2c&callback=initMap"></script>

</div>