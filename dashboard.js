async function loadData() {
  const { data, error } = await supabase
    .from("sensor_readings")
    .select("*")
    .order("reading_time", { ascending: false })
    .limit(1);

  if (error) {
    console.log(error);
    return;
  }

  if (data.length > 0) {
    const row = data[0];

    document.getElementById("ph").innerText = row.ph;
    document.getElementById("ec").innerText = row.ec + " mS/cm";
    document.getElementById("ppm").innerText = row.ppm;
    document.getElementById("temp").innerText = row.water_temp + " °C";
    document.getElementById("level").innerText = row.water_level + " L";
  }
}

loadData();
setInterval(loadData, 5000);
