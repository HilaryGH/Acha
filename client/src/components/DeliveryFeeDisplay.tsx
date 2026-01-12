import { calculateDeliveryFee, getDeliveryFeeStructure } from '../utils/deliveryFee';
import type { DeliveryMechanism } from '../utils/deliveryFee';

interface DeliveryFeeDisplayProps {
  mechanism: DeliveryMechanism | '';
  distanceKm?: number;
  showCalculation?: boolean;
  className?: string;
}

function DeliveryFeeDisplay({ mechanism, distanceKm, showCalculation = false, className = '' }: DeliveryFeeDisplayProps) {
  if (!mechanism) {
    return null;
  }

  const structure = getDeliveryFeeStructure(mechanism as DeliveryMechanism);
  if (!structure) {
    return null;
  }

  const totalFee = calculateDeliveryFee(mechanism as DeliveryMechanism, distanceKm || 0);
  const mechanismName = mechanism === 'cycle-rider' ? 'Cycle Riders' :
                        mechanism === 'e-bike-rider' ? 'E Bike Riders' :
                        'Motorcycle Riders';

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      <h4 className="text-sm font-semibold text-blue-900 mb-2">Delivery Fee - {mechanismName}</h4>
      <div className="space-y-1 text-xs text-blue-800">
        <div className="flex justify-between">
          <span>Flag down fee (Base fee):</span>
          <span className="font-semibold">{structure.baseFee} Birr</span>
        </div>
        <div className="flex justify-between">
          <span>Per Km:</span>
          <span className="font-semibold">{structure.perKmFee} Birr</span>
        </div>
        {showCalculation && distanceKm !== undefined && distanceKm > 0 && (
          <div className="pt-2 border-t border-blue-300 mt-2">
            <div className="flex justify-between">
              <span>Distance:</span>
              <span className="font-semibold">{distanceKm} Km</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Calculation:</span>
              <span className="font-semibold">{structure.baseFee} + ({structure.perKmFee} × {distanceKm})</span>
            </div>
          </div>
        )}
        <div className="pt-2 border-t border-blue-300 mt-2">
          <div className="flex justify-between">
            <span className="font-bold">Total Fee:</span>
            <span className="font-bold text-blue-900">{totalFee} Birr</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryFeeDisplay;

