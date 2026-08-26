import type { ComponentType } from 'react';

import { P33EnergyLadderLab } from './P33EnergyLadderLab';
import { C33NutrientCycleLab } from './C33NutrientCycleLab';
import { B33EcosystemServicesLab } from './B33EcosystemServicesLab';
import { P34IrrigationLab } from './P34IrrigationLab';
import { C34FertilizerLab } from './C34FertilizerLab';
import { B34FarmTeamLab } from './B34FarmTeamLab';
import { P35SortingMachineLab } from './P35SortingMachineLab';
import { C35MeltRemakeLab } from './C35MeltRemakeLab';
import { B35CompostCrewLab } from './B35CompostCrewLab';
import { P36FilterLab } from './P36FilterLab';
import { C36ChlorineLab } from './C36ChlorineLab';
import { B36WaterDetectiveLab } from './B36WaterDetectiveLab';
import { P37PumpedHydroLab } from './P37PumpedHydroLab';
import { C37BatteryLab } from './C37BatteryLab';
import { B37BodyBatteryLab } from './B37BodyBatteryLab';
import { P38FeedbackLoopLab } from './P38FeedbackLoopLab';
import { C38PhotoresistorLab } from './C38PhotoresistorLab';
import { B38NatureRobotsLab } from './B38NatureRobotsLab';
import { P39LogicGateLab } from './P39LogicGateLab';
import { C39SemiconductorLab } from './C39SemiconductorLab';
import { B39NeuronLab } from './B39NeuronLab';
import { P40MeasurementLab } from './P40MeasurementLab';
import { C40FairTestLab } from './C40FairTestLab';
import { B40EvidenceLab } from './B40EvidenceLab';
import { P41ProbabilityLab } from './P41ProbabilityLab';
import { C41CollisionLab } from './C41CollisionLab';
import { B41InheritanceLab } from './B41InheritanceLab';
import { P42FollowThroughLab } from './P42FollowThroughLab';
import { C42HydrationLab } from './C42HydrationLab';
import { B42RecoveryLab } from './B42RecoveryLab';
import { P43ImpactLab } from './P43ImpactLab';
import { C43FoamLab } from './C43FoamLab';
import { B43AccessLab } from './B43AccessLab';

export interface LabProps {
    state: Record<string, unknown>;
    onStateChange: (key: string, value: unknown) => void;
}

/**
 * Visual labs for Big Idea 33+. Looked up by lesson id so LessonShell does not need
 * another import and ternary branch per lesson.
 */
export const EXTENDED_LAB_COMPONENTS: Record<string, ComponentType<LabProps>> = {
    p33: P33EnergyLadderLab,
    c33: C33NutrientCycleLab,
    b33: B33EcosystemServicesLab,
    p34: P34IrrigationLab,
    c34: C34FertilizerLab,
    b34: B34FarmTeamLab,
    p35: P35SortingMachineLab,
    c35: C35MeltRemakeLab,
    b35: B35CompostCrewLab,
    p36: P36FilterLab,
    c36: C36ChlorineLab,
    b36: B36WaterDetectiveLab,
    p37: P37PumpedHydroLab,
    c37: C37BatteryLab,
    b37: B37BodyBatteryLab,
    p38: P38FeedbackLoopLab,
    c38: C38PhotoresistorLab,
    b38: B38NatureRobotsLab,
    p39: P39LogicGateLab,
    c39: C39SemiconductorLab,
    b39: B39NeuronLab,
    p40: P40MeasurementLab,
    c40: C40FairTestLab,
    b40: B40EvidenceLab,
    p41: P41ProbabilityLab,
    c41: C41CollisionLab,
    b41: B41InheritanceLab,
    p42: P42FollowThroughLab,
    c42: C42HydrationLab,
    b42: B42RecoveryLab,
    p43: P43ImpactLab,
    c43: C43FoamLab,
    b43: B43AccessLab,
};
