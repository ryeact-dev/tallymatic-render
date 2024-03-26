import { Slider } from '@/common/ui/slider';
import { Input } from '@/common/ui/input';
import { Label } from '@/common/ui/label';
import { Button } from '@/common/ui/button';

export default function ScoresheetForm({
  closeModal,
  scoresheet,
  handleRangeChange,
  handleInputChange,
  loadingMutation,
}) {
  return (
    <div className='flex-[2] flex flex-col items-center justify-between'>
      <div className='space-y-2 w-full'>
        {scoresheet?.map((criteria, index) => (
          <div key={index} className='flex flex-col gap-4'>
            <Label className='text-lg -mb-4 !font-bold'>
              {criteria.criteriaTitle} [ {criteria.percent}% ]
            </Label>
            <div className='flex justify-between items-center w-full gap-4 mb-2'>
              <Slider
                value={[criteria.score || 0]}
                max={criteria.percent}
                min={0}
                step={0.1}
                onValueChange={(values) => handleRangeChange(values, index)}
                // change the styles (handle colors and background)
                // change it directly to Slider component
                className='hover:cursor-pointer'
              />
              <Input
                className='w-20 text-lg font-semibold border-gray-300 p-2'
                type='number'
                value={criteria.score || 0}
                max={criteria.percent}
                min={0}
                step={0.1}
                onChange={(evt) => handleInputChange(evt, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className='w-full flex items-center justify-end gap-2'>
        <Button
          variant='outline'
          className='hover:bg-destructive text-destructive border-destructive'
          type='button'
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button className='px-8' disabled={loadingMutation}>
          {loadingMutation ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}
