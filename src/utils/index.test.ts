import test from "ava";
import { calcAverage, calculateSuccessRate } from "@/utils";
import { TrialData } from "@/types/global";

// Build a TrialData row with only the fields these calculations read.
const makeTrial = (success: number, unsuccess: number): TrialData => ({
  success,
  unsuccess,
  created_at: new Date("2026-01-01"),
  first_name: "Test",
  last_name: "Para",
  trial_data_id: "trial-1",
});

test("calculateSuccessRate returns null when there are no attempts", (t) => {
  t.is(calculateSuccessRate({ success: 0, unsuccess: 0 }), null);
});

test("calculateSuccessRate returns 100 when every attempt succeeds", (t) => {
  t.is(calculateSuccessRate({ success: 4, unsuccess: 0 }), 100);
});

test("calculateSuccessRate returns 0 when every attempt fails", (t) => {
  t.is(calculateSuccessRate({ success: 0, unsuccess: 5 }), 0);
});

test("calculateSuccessRate returns the percentage for mixed attempts", (t) => {
  t.is(calculateSuccessRate({ success: 3, unsuccess: 1 }), 75);
});

test("calcAverage returns null for an empty list", (t) => {
  t.is(calcAverage([]), null);
});

test("calcAverage averages the success rate of each trial", (t) => {
  const trials = [makeTrial(3, 1), makeTrial(1, 1)]; // 75% and 50%
  t.is(calcAverage(trials), 62.5);
});

test("calcAverage skips trials that have no attempts", (t) => {
  const trials = [makeTrial(4, 0), makeTrial(0, 0)]; // 100% and null
  t.is(calcAverage(trials), 100);
});
