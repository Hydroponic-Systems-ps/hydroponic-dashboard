async function loadData() {

  const crop = document.getElementById("crop").value;
  const stage = document.getElementById("stage").value;

  // Latest sensor reading
  const { data: sensor } = await supabaseClient
    .from("sensor_readings")
    .select("*")
    .order("reading_time", { ascending: false })
    .limit(1);

  // Crop standards
  const { data: standard } = await supabaseClient
    .from("crop_standards")
    .select("*")
    .eq("crop_name", crop)
    .eq("growth_stage", stage)
    .single();

  if (!sensor || sensor.length === 0 || !standard) return;

  const row = sensor[0];

  // Live values
  document.getElementById("ph").innerText = row.ph;
  document.getElementById("ec").innerText = row.ec + " mS/cm";
  document.getElementById("ppm").innerText = row.ppm;
  document.getElementById("temp").innerText = row.water_temp + " °C";
  document.getElementById("level").innerText = row.water_level + " L";

  // Target values
  document.getElementById("phTarget").innerText =
      standard.ph_min + " - " + standard.ph_max;

  document.getElementById("ecTarget").innerText =
      standard.ec_min + " - " + standard.ec_max;

  // Status
  document.getElementById("phStatus").innerText =
      row.ph < standard.ph_min ? "🔵 LOW"
      : row.ph > standard.ph_max ? "🔴 HIGH"
      : "🟢 OK";

  document.getElementById("ecStatus").innerText =
      row.ec < standard.ec_min ? "🔵 LOW"
      : row.ec > standard.ec_max ? "🔴 HIGH"
      : "🟢 OK";
}

loadData();
setInterval(loadData, 5000);

document.getElementById("crop").onchange = loadData;
document.getElementById("stage").onchange = loadData;
