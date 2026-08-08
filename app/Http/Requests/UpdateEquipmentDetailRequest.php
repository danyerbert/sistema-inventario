<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEquipmentDetailRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('equipment')->id_equipment_details;

        return [
            'property_number' => ['nullable', 'string', 'max:120', "unique:equipment_details,property_number,{$id},id_equipment_details"],
            'serial' => ['nullable', 'string', 'max:200'],
            'observaciones' => ['nullable', 'string'],
            'id_type_of_equipment' => ['required', 'exists:type_of_equipment,id_type_of_equipment'],
            'id_brand' => ['required', 'exists:brands,id_brand'],
            'number_workstation' => ['nullable', 'string', 'max:120'],
            'id_operational_status' => ['required', 'exists:operational_statuses,id_operational_status'],
        ];
    }
}
