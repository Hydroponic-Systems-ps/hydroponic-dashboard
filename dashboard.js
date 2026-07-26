async function loadData() {
  const { data, error } = await supabaseClient
    .from("sensor_readings")
    .select("*")
    .order("reading_time", { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
}

loadData();
