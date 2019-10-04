import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CoreService } from 'src/app/core/core.service';
import { NgbRatingConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit, OnChanges {
  @Input() public product;
  @Output() public productList = new EventEmitter();
  public Editor = ClassicEditor;
  public productid = null;
  public name: null;
  message: string;
  productForm: FormGroup;
  id: string;
  isAdmin: boolean;
  formData;
  userId: string;
  isSubmitted: boolean;
  selectedFile: File;
  categories: Array<AppModel.Category>;
  subCategories: Array<AppModel.Category>;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    config: NgbRatingConfig,
    private coreService: CoreService,
    public modal: NgbActiveModal
  ) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
    this.id = null;
    this.isSubmitted = false;
    this.userId = this.coreService.userId;
    this.isAdmin = this.coreService.isAdmin;
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.maxLength(250)]],
      price: ['', Validators.required],
      rating: [null, Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: ['', Validators.required],
      productImage: ''
    });
    this.productService.getCategoryList().subscribe((res: any) => {
      if (res && res.status === true) {
        this.categories = res.category;
      }
    });
    if (this.product) {
      this.id = this.product._id;
    }
    if (this.id) {
      this.onSelect(this.product.category[0]);
      this.productForm.patchValue({
        productName: this.product.productName,
        description: this.product.description,
        category: this.product.category[0],
        subCategory: this.product.subCategory[0],
        price: this.product.price,
        rating: this.product.rating,
        productImage: null
      });
    }
  }
  setValue() {
    this.productForm.value.status = 'pending';
    this.productForm.value.seller = this.userId;
    const fv = this.productForm.value;
    this.formData = new FormData();
    this.formData.append('productName', fv.productName);
    this.formData.append('description', fv.description);
    this.formData.append('category', fv.category);
    this.formData.append('subCategory', fv.subCategory);
    this.formData.append('price', fv.price);
    this.formData.append('rating', fv.rating);
    this.formData.append('status', fv.status);
    this.formData.append('seller', fv.seller);
    if (this.selectedFile && this.selectedFile.name) {
      this.formData.append(
        'productImage',
        this.selectedFile,
        this.selectedFile.name
      );
    }
  }
  ngOnChanges() {
    if (this.product !== '') {
      this.productForm.patchValue({
        productName: this.product.productName,
        price: this.product.price,
        rating: this.product.rating
      });
      this.productid = this.product.id;
      this.name = this.product.productName;
    }
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onSelect(e) {
    this.productService.getSubCategoryList(e).subscribe(res => {
      this.subCategories = res.category;
    });
  }
  add() {
    this.isSubmitted = true;
    if (this.productForm.valid) {
      this.setValue();
      this.productService.add(this.formData).subscribe(res => {
        if (res.success) {
          this.coreService.showSuccess(res.message);
          this.reset();
          this.coreService.notify({ option: 'product', value: res });
          this.productList.emit(res);
          this.isSubmitted = false;
          this.modal.close();
        } else {
          this.coreService.showError(res.message);
        }
      });
    } else {
      this.coreService.showError('Form field is not valid');
    }
  }

  update() {
    this.isSubmitted = true;
    if (this.productForm.valid) {
      this.setValue();
      this.productService.update(this.formData, this.id).subscribe(res => {
        if (res.success) {
          this.coreService.notify({ option: 'product', value: res });
          this.coreService.showSuccess(res.message);
          this.reset();
          this.productList.emit(res);
          this.isSubmitted = false;
          this.modal.close();
        } else {
          this.coreService.showError(res.message);
        }
      });
    }
  }
  delete(e) {
    this.isSubmitted = true;
    if (!this.id) {
      this.coreService.showWarning('Please select the product');
    } else {
      this.productService.delete(this.id).subscribe(res => {
        if (res.success) {
          this.coreService.showSuccess(res.message);
          this.reset();
          this.productList.emit(res);
          this.isSubmitted = false;
          this.router.navigate(['/dashboard/product']);
        }
      });
    }
  }
  reset() {
    this.productForm.reset();
    this.product = null;
    this.productid = null;
    this.isSubmitted = false;
  }
  get formControls() {
    return this.productForm.controls;
  }
}
