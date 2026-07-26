async function loadData() {

  const { data, error } = await supabaseClient
    .from("sensor_readings")
    .select("*")
    .order("reading_time", { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  if (!data || data.length === 0) {
    alert("No data found in sensor_readings table");
    return;
  }

  const row = data[0];

  document.getElementById("ph").innerText = row.ph;
  document.getElementById("ec").innerText = row.ec + " mS/cm";
  document.getElementById("ppm").innerText = row.ppm;
  document.getElementById("temp").innerText = row.water_temp + " °C";
  document.getElementById("level").innerText = row.water_level + " L";
}

loadData();
setInterval(loadData, 5000);
