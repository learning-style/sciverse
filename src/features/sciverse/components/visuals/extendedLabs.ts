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
import { P44MaterialTestLab } from './P44MaterialTestLab';
import { C44ArrangementLab } from './C44ArrangementLab';
import { B44LayeredLab } from './B44LayeredLab';
import { P45DistanceLab } from './P45DistanceLab';
import { C45AbsorberLab } from './C45AbsorberLab';
import { B45HairCellLab } from './B45HairCellLab';
import { P46LightMixLab } from './P46LightMixLab';
import { C46FadingLab } from './C46FadingLab';
import { B46ConeCellLab } from './B46ConeCellLab';
import { P47TerritoryLab } from './P47TerritoryLab';
import { C47ScentLab } from './C47ScentLab';
import { B47NicheLab } from './B47NicheLab';
import { P48CameraLab } from './P48CameraLab';
import { C48TraceLab } from './C48TraceLab';
import { B48TrendLab } from './B48TrendLab';
import { P49DiggingLab } from './P49DiggingLab';
import { C49SmeltLab } from './C49SmeltLab';
import { B49HealingLab } from './B49HealingLab';
import { P50OrbitLab } from './P50OrbitLab';
import { C50SpaceMaterialsLab } from './C50SpaceMaterialsLab';
import { B50DetailLab } from './B50DetailLab';
import { L2P1ForceLab } from './L2P1ForceLab';
import { L2C1HeatLab } from './L2C1HeatLab';
import { L2B1LeverLab } from './L2B1LeverLab';
import { L2P33PyramidLab } from './L2P33PyramidLab';
import { L2C33BudgetLab } from './L2C33BudgetLab';
import { L2B33BackupLab } from './L2B33BackupLab';
import { L2P49MetalCostLab } from './L2P49MetalCostLab';
import { L3P1SlopeLab } from './L3P1SlopeLab';
import { L3C1HeatingCurveLab } from './L3C1HeatingCurveLab';
import { L3B1EngineLab } from './L3B1EngineLab';
import { L2P2DensityLab } from './L2P2DensityLab';
import { L2C2FormulaMassLab } from './L2C2FormulaMassLab';
import { L2B2CellSizeLab } from './L2B2CellSizeLab';
import { L3P2GasLab } from './L3P2GasLab';
import { L3C2MoleLab } from './L3C2MoleLab';
import { L3B2DiffusionLab } from './L3B2DiffusionLab';
import { L2P3RampLab } from './L2P3RampLab';
import { L2C3CalorimeterLab } from './L2C3CalorimeterLab';
import { L2B3LeafLab } from './L2B3LeafLab';

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
    p44: P44MaterialTestLab,
    c44: C44ArrangementLab,
    b44: B44LayeredLab,
    p45: P45DistanceLab,
    c45: C45AbsorberLab,
    b45: B45HairCellLab,
    p46: P46LightMixLab,
    c46: C46FadingLab,
    b46: B46ConeCellLab,
    p47: P47TerritoryLab,
    c47: C47ScentLab,
    b47: B47NicheLab,
    p48: P48CameraLab,
    c48: C48TraceLab,
    b48: B48TrendLab,
    p49: P49DiggingLab,
    c49: C49SmeltLab,
    b49: B49HealingLab,
    p50: P50OrbitLab,
    c50: C50SpaceMaterialsLab,
    b50: B50DetailLab,
    l2p1: L2P1ForceLab,
    l2c1: L2C1HeatLab,
    l2b1: L2B1LeverLab,
    l2p33: L2P33PyramidLab,
    l2c33: L2C33BudgetLab,
    l2b33: L2B33BackupLab,
    l2p49: L2P49MetalCostLab,
    l3p1: L3P1SlopeLab,
    l3c1: L3C1HeatingCurveLab,
    l3b1: L3B1EngineLab,
    l2p2: L2P2DensityLab,
    l2c2: L2C2FormulaMassLab,
    l2b2: L2B2CellSizeLab,
    l3p2: L3P2GasLab,
    l3c2: L3C2MoleLab,
    l3b2: L3B2DiffusionLab,
    l2p3: L2P3RampLab,
    l2c3: L2C3CalorimeterLab,
    l2b3: L2B3LeafLab,
};
