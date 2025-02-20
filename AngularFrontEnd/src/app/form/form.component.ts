import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../store/cart.service';
import { ShopServiceService } from '../../services/shop-service.service';
import { Style } from '../models/style.model';
import { Variety } from '../models/variety.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  wineForm!: FormGroup;
  stylesArray: Style[] = [];
  varietiesArray: Variety[] = [];
  selectedImages: { file: File, url: string }[] = [];
  selectedCover: { file: File, url: string } | null = null;
  uploading: boolean = false;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private wineService: ShopServiceService
  ) {}
  ngOnInit() {
    this.wineForm = this.fb.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      origin: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantityState: ['', Validators.required],
      volume: ['', Validators.required],
      alcohol: ['', Validators.required],
      styles: [[], Validators.required],
      varieties: [[], Validators.required],
      expo: this.fb.array([]),
      imageCover: [null, Validators.required],
      images: [[]]
    });

    this.wineService.getStyles().subscribe(data => this.stylesArray = data.styles);
    this.wineService.getVarieties().subscribe(data => this.varietiesArray = data.varities);
  }

  get expoArray() {
    return this.wineForm.get('expo') as FormArray;
  }

  addExpo() {
    this.expoArray.push(this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    }));
  }

  removeExpo(index: number) {
    this.expoArray.removeAt(index);
  }

  handleImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        this.selectedImages.push({ file, url: URL.createObjectURL(file) });
      });
      this.wineForm.patchValue({ images: this.selectedImages.map(img => img.file) });
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.wineForm.patchValue({ images: this.selectedImages.map(img => img.file) });
  }
  navigateToShop() {
    this.router.navigate(['/shop']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedCover = { file, url: URL.createObjectURL(file) };
      this.wineForm.patchValue({ imageCover: file });
    }
  }
  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  onSubmit() {
    if (this.wineForm.invalid) return;

    const formData = new FormData();

 
    Object.keys(this.wineForm.value).forEach(key => {
      if (key === 'styles' || key === 'varieties') {
        this.wineForm.value[key].forEach((id: string) => formData.append(key, id));
      } else if (key === 'expo') {
        this.wineForm.value.expo.forEach((location: any, index: number) => {
          formData.append(`expo[${index}][position][latitude]`, location.latitude);
          formData.append(`expo[${index}][position][longitude]`, location.longitude);
        });
      } else if (key !== 'imageCover' && key !== 'images') {
        formData.append(key, this.wineForm.value[key]);
      }
    });

   
    if (this.selectedCover?.file) {
      formData.append('imageCover', this.selectedCover.file);
    }

    if (this.selectedImages.length > 0) {
      this.selectedImages.forEach(img => formData.append('images', img.file));
    }

    this.uploading = true;
    this.successMessage = '';
    
    this.http.post('http://localhost:5000/api/v1/wines', formData,{withCredentials:true}).subscribe({
      next: () => {
        this.uploading = false;
        this.successMessage = 'Vino uspešno dodato!';
        this.wineForm.reset();
        this.selectedImages = [];
        this.selectedCover = null;
      },
      error: (error) => {
        this.uploading = false;
        console.error('Greška:', error);
      }
    });
  }
}