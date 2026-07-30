function toDateKey(date) {
  const value = new Date(date);
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
}

export function calculateWorkoutStats(workouts) {
  const totals = workouts.reduce(
    (summary, workout) => ({
      count: summary.count + 1,
      duration: summary.duration + workout.duration,
      calories: summary.calories + workout.calories,
    }),
    { count: 0, duration: 0, calories: 0 },
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return {
      key: toDateKey(date),
      label: new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(date),
      date,
      duration: 0,
      count: 0,
      calories: 0,
    };
  });
  const byDay = new Map(days.map((day) => [day.key, day]));
  const categoryTotals = new Map();

  workouts.forEach((workout) => {
    const day = byDay.get(toDateKey(workout.date));
    if (day) {
      day.duration += workout.duration;
      day.count += 1;
      day.calories += workout.calories;
    }

    categoryTotals.set(workout.category, (categoryTotals.get(workout.category) || 0) + 1);
  });

  const weekly = days.reduce(
    (summary, day) => ({
      count: summary.count + day.count,
      duration: summary.duration + day.duration,
      calories: summary.calories + day.calories,
    }),
    { count: 0, duration: 0, calories: 0 },
  );

  return {
    totals,
    weekly,
    days,
    maxDailyDuration: Math.max(...days.map((day) => day.duration), 1),
    categories: [...categoryTotals.entries()]
      .map(([category, count]) => ({ category, count, percentage: Math.round((count / totals.count) * 100) }))
      .sort((a, b) => b.count - a.count),
  };
}
